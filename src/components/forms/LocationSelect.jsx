import { React, useState, useRef, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import { Button, MediumText, Question, SmallText, Spinner } from "../"
import { API_URL } from "../../constants"
import { useFetch } from "use-http"

const LocationSelect = ({ values, questionId, updateAnswer, className }) => {
    const [locationType, setLocationType] = useState(null)
    const pageType = useLocation().pathname.split("/").pop()
    
    const updateLocationType = (type) => {
        setLocationType(type)
        updateAnswer(null, questionId)
    }

    const renderLocationTypeSelect = () => {
        return (
            <div className="flex flex-col items-start justify-start gap-x-12 gap-y-4 mx-2 md:flex-row md:items-end md:justify-between">
                <Button
                    style={{ backgroundColor: locationType != "exact" ? "#384866" : "#15bfe6" }}
                    className="rounded-md w-full text-white"
                    onClick={() => updateLocationType("exact")}>
                    Znam točnu lokaciju
                </Button>
                <Button
                    style={{ backgroundColor: locationType != "nonExact" ? "#384866" : "#15bfe6" }}
                    className="rounded-md bg-blue w-full text-white"
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
                        mapCenter={values?.mapCenter}
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
                        mapCenter={values?.mapCenter}
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
        let answer = {
            type: "Point",
            coordinates: point,
        }
        updateAnswer(answer, questionId)
    }

    return (
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
    )
}

const NonExactLocationSelect = ({ updateAnswer, questionId, mapCenter, className, pageType }) => {
    const fgRef = useRef(null)
    const [linesSelected, setLinesSelected] = useState([])
    const [multiLineString, setMultiLineString] = useState([])

    const AreaCode = "Zagreb"
    const { data: {data: {transportLines = []} = {}} = {}, loading, error: fetchError } = useFetch(`${API_URL}/config/transportLines/${AreaCode}`, { cachePolicy: "no-cache" }, [])
    if (fetchError)
        console.error("A useFetch error occurred: ", fetchError)

    useEffect(() => {
        if (loading === false)
            setLinesSelected(transportLines.map(item => {
                return { ...item, select: false}
            }).sort((a, b) => a.number - b.number))
    }, [loading])

    useEffect(() => {
        if (linesSelected.length === 0 && multiLineString.length === 0) {
            updateAnswer(null, questionId)
        } else {
            const selectedTransportLines = linesSelected
                .filter(x => x.select === true)
                .map(x => x.id)

            let answer = {
                type: "MultiLineString",
                coordinates: multiLineString,
                publicTransportLines: selectedTransportLines,
            }
            if (selectedTransportLines.length === 0 && multiLineString.length === 0)
                updateAnswer(null, questionId)
            else 
                updateAnswer(answer, questionId)
        }
    }, [multiLineString, linesSelected])
    
    const separateLines = linesSelected.reduce((acc, item) => {
        const index = acc.findIndex((group) => group[0]?.type === item.type);
        if (index === -1) {
          acc.push([item]);
        } else {
          acc[index].push(item);
        }
        return acc;
    }, [])

    const handleSelectedLines = (id) => {
        const newlinesSelected = linesSelected.map((item) => {
            return item.id === id
            ? { ...item, select: !item.select }
            : {...item, select: (pageType === "found" ? false : item.select) }
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

    return (
        loading ? <Spinner /> :
        <>
            {pageType === "lost" &&
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
            }
            <div className="flex flex-col items-center justify-center mt-2">
                    <MediumText className="my-2">Kojim linijama si se vozio?</MediumText>
                    {separateLines.map((linesByType, index) => {
                        return (
                            <PublicTransportType key={index} lines={linesByType}
                                pageType={pageType} handleSelectedLines={handleSelectedLines} />
                        )
                    })}
            </div>
        </>
    )
}

const PublicTransportType = ({lines, pageType, handleSelectedLines }) => {
    const [open, setOpen] = useState(false)
    const refScroll = useRef(null)

    useEffect(() => {
        if (open) {
            refScroll.current.scrollIntoView({ behavior: "smooth" })
        }
    }, [open]);

    return (
        <nav className="w-full flex flex-col items-center justify-center">
            <div className="my-4 flex items-center justify-center gap-x-2 w-fit h-fit px-4 py-2 rounded-xl border-2 border-primary cursor-pointer select-none" 
                onClick={() => setOpen(!open)}>
                <SmallText>{lines[0].type}</SmallText>
                <svg className={`h-4 w-auto transition-all duration-200 ${open && "rotate-180"}`} xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </div>
            {open &&
                <ChoiceType isMultiple={pageType !== "found"}
                    values={lines} 
                    getSelectedValue={(id) => handleSelectedLines(id)} 
                />
            }
            <div ref={refScroll}></div>
        </nav>
    )
}

const ChoiceType = ({ isMultiple, values, getSelectedValue }) => {
    const listRadioItems = values.map((item, index) => {
        return (
            <li key={index}>
                <RadioComponent isMultiple={isMultiple} label={`${item.name} ${item.number}`} id={item.id} 
                    handleSelectedState={(id) => getSelectedValue(id)} checked={item.select} />
            </li>
        )
    })
    return (
        <nav className="w-full flex justify-center items-center">
            <ul className="grid w-fit grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-8 gap-y-4 list-none">{listRadioItems}</ul>
        </nav>
    )
}

const RadioComponent = ({ isMultiple, label, id, handleSelectedState, checked }) => {
    return (
        <div
            className={`rounded-xl items-center flex border-2 max-w-xs
                hover:bg-opacity-80 hover:border-primary hover:border-opacity-40 duration-100 cursor-pointer 
                ${checked ? "bg-primary border-primary" : "bg-gray border-gray"}
                ${isMultiple ? "pl-3 py-1" : "pl-2 py-2"}`}
            onClick={() => handleSelectedState(id)}>
            {isMultiple &&
                <div className={`w-6 h-6 rounded-md bg-white flex items-center justify-center ${checked ? "bg-secondary" : ""}`}>
                    {checked && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" className="fill-primary">
                            <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z" />
                        </svg>
                    )}
                </div>
            }
            <SmallText className="inline-block mx-3 select-none text-sm">{label}</SmallText>
        </div>
    )
}

const addLocationSelectQuestion = (questionText, options, key, updateAnswer, ) => {
    return (
        <Question questionText={questionText} key={key}>
            <LocationSelect values={options} questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}
export default addLocationSelectQuestion
