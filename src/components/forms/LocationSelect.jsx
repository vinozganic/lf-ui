import { React, useState, useRef, useEffect, useCallback } from "react"
import { useLocation } from "react-router-dom"
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import { Button, MediumText, Question, SmallText, Spinner, SvgList } from "../"
import { API_URL } from "../../constants"
import { useFetch } from "use-http"
import "./LocationAnimation.css"

const LocationSelect = ({ questionId, updateAnswer, className }) => {
    const [locationType, setLocationType] = useState(null)
    const pageType = useLocation().pathname.split("/").pop()

    const updateLocationType = (type) => {
        if (type !== locationType) {
            setLocationType(type)
            updateAnswer(null, questionId)
        }
    }

    const renderLocationTypeSelect = () => {
        return (
            <div className="w-full flex flex-col items-start justify-start gap-x-12 gap-y-4 md:flex-row md:items-end md:justify-between">
                <Button
                    style={{ backgroundColor: locationType != "exact" ? "#384866" : "#15bfe6", boxShadow: "none" }}
                    className="rounded-md w-full text-white"
                    buttonClassName="border-none"
                    onClick={() => updateLocationType("exact")}>
                    Znam točnu lokaciju
                </Button>
                <Button
                    style={{ backgroundColor: locationType != "nonExact" ? "#384866" : "#15bfe6", boxShadow: "none" }}
                    className="rounded-md bg-blue w-full text-white"
                    buttonClassName="border-none"
                    onClick={() => updateLocationType("nonExact")}>
                    {pageType === "found" ? "Javni prijevoz" : "Ne znam točnu lokaciju"}
                </Button>
            </div>
        )
    }

    const renderLocationSelect = () => {
        if (locationType === "exact") {
            return (
                <>
                    {renderLocationTypeSelect()}
                    <ExactLocationSelect
                        updateAnswer={updateAnswer}
                        questionId={questionId}
                        mapCenter={[45.815399, 15.966568]}
                        className="mt-6"
                    />
                </>
            )
        } else if (locationType === "nonExact") {
            return (
                <>
                    {renderLocationTypeSelect()}
                    <NonExactLocationSelect
                        updateAnswer={updateAnswer}
                        questionId={questionId}
                        mapCenter={[45.815399, 15.966568]}
                        className="mt-6"
                        pageType={pageType}
                    />
                </>
            )
        } else {
            return renderLocationTypeSelect()
        }
    }

    return <div className={`${className}`}>{renderLocationSelect()}</div>
}

const ExactLocationSelect = ({ updateAnswer, questionId, mapCenter, className }) => {
    const fgRef = useRef(null)

    const onCreated = (e) => {
        for (const layer in fgRef.current._layers) {
            fgRef.current.removeLayer(fgRef.current._layers[layer])
        }

        fgRef.current.addLayer(e.layer)

        let point = e.layer.toGeoJSON()["geometry"]["coordinates"]

        let path = {
            type: "Point",
            coordinates: point,
        }

        let answer = {
            path,
            publicTransportLines: [],
        }
        updateAnswer(answer, questionId)
    }

    return (
        <>
            <div className="flex mt-4 gap-2 justify-start items-center">
                <div>{SvgList["info"]}</div>
                <SmallText className="text-sm font-semibold text-white/60">
                    U desnom gornjem kutu nalaze se gumbovi za interakciju sa kartom.
                </SmallText>
            </div>
            <div className="relative">
                <MapContainer
                    center={mapCenter}
                    zoom={13}
                    style={{ height: "60vh", borderRadius: "0.25rem", zIndex: 0 }}
                    className={`z-0 rounded-xl ${className}`}>
                    <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                    <FeatureGroup ref={fgRef}>
                        <EditControl
                            position="topright"
                            onCreated={onCreated}
                            on
                            draw={{
                                rectangle: false,
                                circle: false,
                                circlemarker: false,
                                polyline: false,
                                polygon: false,
                                marker: {
                                    icon: new L.Icon({
                                        iconUrl: "/images/marker.png",
                                        iconSize: [40, 40],
                                    }),
                                },
                            }}
                        />
                    </FeatureGroup>
                </MapContainer>
                <div className="md:translate-x-5 translate-x-3 -translate-y-2 absolute top-0 right-0 pointer-events-none">
                    <div className="py-16 md:px-10 px-8 pointer-events-none flex justify-center items-center animate-fadeOut rounded-3xl w-10 h-36 border-8 border-solid bg-[rgb(255,0,0,0.11)] border-red z-10"></div>
                </div>
            </div>
        </>
    )
}

const NonExactLocationSelect = ({ updateAnswer, questionId, mapCenter, className, pageType }) => {
    const fgRef = useRef(null)
    const scrollRef = useRef(null)
    const [multiLineString, setMultiLineString] = useState([])
    const [typeShownID, setTypeShownID] = useState(null)
    const [linesSelected, setLinesSelected] = useState([])
    const [lineSearch, setLineSearch] = useState("")

    const AreaCode = "Zagreb"
    const { loading: loading, error: fetchError, request: linesReq, response: linesRes } = useFetch(`${API_URL}`)
    const getTransportLines = useCallback(async () => {
        const dataGet = await linesReq.get(`/config/transportLines/${AreaCode}`)
        if (linesRes.ok) {
            setLinesSelected(
                dataGet.data.transportLines
                    .sort((a, b) => a.number - b.number)
                    .reduce((acc, item) => {
                        item = { ...item, select: false }
                        const index = acc.findIndex((group) => group[0]?.type === item.type)
                        if (index === -1) {
                            acc.push([item])
                        } else {
                            acc[index].push(item)
                        }
                        return acc
                    }, [])
            )
        }
    }, [linesReq, linesRes])

    useEffect(() => {
        if (fetchError) console.error("A useFetch error occurred: ", fetchError)
        getTransportLines()
    }, [])

    useEffect(() => {
        if (linesSelected.flat().length === 0 && multiLineString.length === 0) {
            updateAnswer(null, questionId)
        } else {
            const selectedTransportLines = linesSelected
                .flat()
                .filter((x) => x.select === true)
                .map((x) => x.id)

            let path = null
            if (multiLineString.length > 0) {
                path = {
                    type: "MultiLineString",
                    coordinates: multiLineString,
                }
            }

            let answer = {
                path,
                publicTransportLines: selectedTransportLines,
            }

            if (selectedTransportLines.length === 0 && multiLineString.length === 0) {
                updateAnswer(null, questionId)
            } else {
                updateAnswer(answer, questionId)
            }
        }
    }, [multiLineString, linesSelected])

    const handleTypeShownID = (idx) => {
        if (typeShownID === idx) setTypeShownID(null)
        else setTypeShownID(idx)
    }

    const handleSelectedLines = (id) => {
        const newlinesSelected = linesSelected.map((arr, index) => {
            if (index === typeShownID) {
                return arr.map((item) => {
                    return item.id === id
                        ? { ...item, select: !item.select }
                        : { ...item, select: pageType === "found" ? false : item.select }
                })
            } else {
                return arr
            }
        })
        setLinesSelected(newlinesSelected)
    }

    const onCreated = (e) => {
        const newMultiLineString = []
        for (const layer in fgRef.current._layers) {
            newMultiLineString.push(fgRef.current._layers[layer].toGeoJSON()["geometry"]["coordinates"])
        }
        setMultiLineString(newMultiLineString)
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }, [typeShownID])

    return loading ? (
        <Spinner />
    ) : (
        <>
            {pageType === "lost" && (
                <>
                    <div className="flex mt-4 gap-2 justify-start items-center">
                        <div>{SvgList["info"]}</div>
                        <SmallText className="text-sm font-semibold text-white/60">
                            U desnom gornjem kutu nalaze se gumbovi za interakciju sa kartom.
                        </SmallText>
                    </div>
                    <div className="relative">
                        <MapContainer
                            center={mapCenter}
                            zoom={13}
                            style={{ height: "60vh", borderRadius: "0.25rem" }}
                            className={`z-0 rounded-xl ${className}`}>
                            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                            <FeatureGroup ref={fgRef}>
                                <EditControl
                                    position="topright"
                                    onCreated={onCreated}
                                    draw={{
                                        rectangle: false,
                                        circle: false,
                                        circlemarker: false,
                                        polyline: {
                                            shapeOptions: {
                                                color: "red",
                                                weight: 8,
                                            },
                                            icon: new L.DivIcon({
                                                iconSize: new L.Point(8, 8),
                                                className: "leaflet-div-icon leaflet-editing-icon rounded-full",
                                            }),
                                        },
                                        polygon: false,
                                        marker: false,
                                    }}
                                />
                            </FeatureGroup>
                        </MapContainer>
                        <div className="md:translate-x-5 translate-x-3 -translate-y-2 absolute top-0 right-0 pointer-events-none">
                            <div className="py-16 md:px-10 px-8 pointer-events-none flex justify-center items-center animate-fadeOut rounded-3xl w-10 h-36 border-8 border-solid bg-[rgb(255,0,0,0.11)] border-red z-10"></div>
                        </div>
                    </div>
                </>
            )}
            {linesRes.ok && (
                <MediumText className="w-full mt-10 text-xl md:text-3xl text-left my-4">
                    Ako si koristio javni prijevoz, odaberi linije kojima si se vozio.
                </MediumText>
            )}
            <RenderTypeList separateLines={linesSelected} typeShownID={typeShownID} handleTypeShownID={handleTypeShownID} />
            {typeShownID !== null && (
                <nav className="pt-2 rounded-xl bg-gray relative">
                    <div className="sticky flex items-center top-0 w-full pb-3 pt-1 bg-gray px-8 border-b-2 border-white/40">
                        <span className="mr-6">
                            <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="26">
                                <path d="M21.15 19.74a12 12 0 1 0-1.41 1.41l10.55 10.56 1.41-1.41zM12 22a10 10 0 1 1 10-10 10 10 0 0 1-10 10z" />
                            </svg>
                        </span>
                        <input
                            type="text"
                            placeholder="Pretraga"
                            className="w-full text-lg bg-gray  focus:outline-none font-bold text-white placeholder:font-normal placeholder:text-lg"
                            value={lineSearch}
                            onChange={(ev) => setLineSearch(ev.target.value)}
                        />
                    </div>
                    <ChoiceType
                        isMultiple={pageType !== "found"}
                        values={linesSelected[typeShownID]}
                        getSelectedValue={handleSelectedLines}
                        lineSearch={lineSearch}
                    />
                </nav>
            )}
            <div ref={scrollRef}></div>
        </>
    )
}

const RenderTypeList = ({ separateLines, typeShownID, handleTypeShownID }) => {
    const slider = useRef(null)
    const [isScrollable, setIsScrollable] = useState(true)

    useEffect(() => {
        if (slider.current.scrollWidth <= slider.current.offsetWidth) {
            setIsScrollable(false)
        } else {
            setIsScrollable(true)
        }
    }, [slider])

    const slideLeft = () => {
        slider.current.scrollLeft = slider.current.scrollLeft - 200
        isScrollable && handleTypeShownID(null)
    }

    const slideRight = () => {
        slider.current.scrollLeft = slider.current.scrollLeft + 200
        isScrollable && handleTypeShownID(null)
    }

    const renderTypeList = separateLines.map((linesByType, index) => {
        let numberOfSelected = 0
        linesByType.forEach((elem) => {
            if (elem.select) numberOfSelected += 1
        })
        return (
            <nav key={index} className="w-full md:flex-1 max-md:flex-none md:min-w-xs inline-block">
                <div
                    className="flex snap-start justify-between items-center
                    md:rounded-xl px-4 py-1 bg-gray cursor-pointer"
                    onClick={() => handleTypeShownID(index)}>
                    <SmallText>{linesByType[0].type}</SmallText>
                    <span className="flex w-fit">
                        <span
                            className={`flex-none transition-opacity duration-300 ${numberOfSelected === 0 ? "opacity-0" : "opacity-100"} 
                            border-2 border-white rounded-xl px-3 py-1 my-1 mr-1 text-xs font-bold`}>
                            {numberOfSelected === 0 ? 1 : numberOfSelected}
                        </span>
                        <svg
                            className={`flex-none fill-white transition-all duration-300 ${typeShownID === index && "rotate-180"}`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            width="30">
                            <path d="M3.81 4.38 8 8.57l4.19-4.19 1.52 1.53L8 11.62 2.29 5.91l1.52-1.53z" />
                        </svg>
                    </span>
                </div>
            </nav>
        )
    })

    return (
        <div className="grid grid-flow-col w-full mb-2">
            {isScrollable && (
                <span
                    className={`min-h-full w-fit flex items-center border-2 border-gray rounded-s-xl cursor-pointer 
                sm:hover:bg-primary/40 transition-all ease-in-out duration-150`}
                    onClick={() => slideLeft()}>
                    <svg className="rotate-180 fill-white w-6" viewBox="0 0 20 20">
                        <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
                    </svg>
                </span>
            )}
            <div ref={slider} className={`flex w-full gap-x-4 snap-x snap-mandatory overflow-x-auto scroll-smooth scrollbar-hide`}>
                {renderTypeList}
            </div>
            {isScrollable && (
                <span
                    className={`min-h-full w-fit flex items-center border-2 border-gray rounded-e-xl cursor-pointer
                hover:bg-primary/40 transition-all ease-in-out duration-150`}
                    onClick={() => slideRight()}>
                    <svg className="fill-white w-6" viewBox="0 0 20 20">
                        <path d="M11.611,10.049l-4.76-4.873c-0.303-0.31-0.297-0.804,0.012-1.105c0.309-0.304,0.803-0.293,1.105,0.012l5.306,5.433c0.304,0.31,0.296,0.805-0.012,1.105L7.83,15.928c-0.152,0.148-0.35,0.223-0.547,0.223c-0.203,0-0.406-0.08-0.559-0.236c-0.303-0.309-0.295-0.803,0.012-1.104L11.611,10.049z"></path>
                    </svg>
                </span>
            )}
        </div>
    )
}

const ChoiceType = ({ isMultiple, values, getSelectedValue, lineSearch }) => {
    const normalizePublicTransportLineName = (string) => {
        return string
            .toLowerCase()
            .replace(/č/g, "c")
            .replace(/ć/g, "c")
            .replace(/š/g, "s")
            .replace(/đ/g, "d")
            .replace(/ž/g, "z")
            .replace(/[^a-zA-Z0-9]/g, "")
    }

    const listRadioItems = values.map((item, index) => {
        const fullName = `${item.name} ${item.number}`
        return (
            <li
                key={index}
                className={`${
                    normalizePublicTransportLineName(fullName).includes(normalizePublicTransportLineName(lineSearch)) ? "block" : "hidden"
                } xl:w-1/3 sm:w-1/2 w-full flex-[0 1 33.33%]`}
                onClick={() => getSelectedValue(item.id)}>
                <RadioComponent isMultiple={isMultiple} label={fullName} checked={item.select} />
            </li>
        )
    })
    return (
        <div className="py-2">
            <ul className="w-full max-h-[13.5rem] overflow-y-auto flex-row flex gap-y-2 flex-wrap scrollbar-hide list-none">
                {listRadioItems}
            </ul>
        </div>
    )
}

const RadioComponent = ({ isMultiple, label, checked }) => {
    return (
        <div
            className={`border-2 mx-2 box-border h-full rounded-xl px-3 py-2 flex items-center
            transition ease-in-out delay-50 hover:scale-[1.02] duration-100 cursor-pointer gap-x-3
            ${
                checked
                    ? "border-primary bg-primary hover:bg-primary/50 hover:border-white"
                    : "border-white bg-gray hover:bg-[#020829]/[.20] hover:border-primary"
            }`}>
            {isMultiple && (
                <div className="w-6 h-6 rounded-md flex items-center justify-center bg-white">
                    {checked && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-primary">
                            <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" />
                        </svg>
                    )}
                </div>
            )}
            <SmallText className="px-2 select-none">{label}</SmallText>
        </div>
    )
}
const addLocationSelectQuestion = (questionText, key, updateAnswer) => {
    return (
        <Question questionText={questionText} key={key}>
            <LocationSelect questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}
export default addLocationSelectQuestion
