import React, { useState, useRef } from "react"
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import Question from "../forms/Question"
import { EditControl } from "react-leaflet-draw"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import SmallText from "../SmallText"
import Button from "../Button"
const LocationSelect = ({ values, questionId, updateAnswer, className }) => {
    const [locationType, setLocationType] = useState(null)

    const renderLocationTypeSelect = () => {
        return (
            <div className="flex flex-col items-start justify-start gap-4 md:flex-row md:items-end md:justify-between">
                <Button
                    style={{ backgroundColor: locationType != "exact" ? "#384866" : "#15bfe6" }}
                    className={`rounded-md w-full text-white`}
                    onClick={() => setLocationType("exact")}>
                    Znam točnu lokaciju gdje je predmet izgubljen
                </Button>
                <Button
                    style={{ backgroundColor: locationType != "nonExact" ? "#384866" : "#15bfe6" }}
                    className={`"rounded-md bg-blue w-full text-white"`}
                    onClick={() => setLocationType("nonExact")}>
                    Ne znam točnu lokaciju gdje je predmet izgubljen
                </Button>
            </div>
        )
    }

    const renderLocationSelect = () => {
        if (locationType === "exact") {
            return (
                <>
                    {renderLocationTypeSelect()}
                    <ExactLocationSelect mapCenter={values?.mapCenter} className={"mt-8"} />
                </>
            )
        } else if (locationType === "nonExact") {
            return (
                <>
                    {renderLocationTypeSelect()}
                    <NonExactLocationSelect mapCenter={values?.mapCenter} className={"mt-8"} />
                </>
            )
        } else {
            return renderLocationTypeSelect()
        }
    }

    return <div className={`rounded-md bg-gray p-4 ${className}`}>{renderLocationSelect()}</div>
}

const ExactLocationSelect = ({ mapCenter, className }) => {
    const [point, setPoint] = useState(null)
    const fgRef = useRef(null)

    const onCreated = (e) => {
        for (const layer in fgRef.current._layers) {
            fgRef.current.removeLayer(fgRef.current._layers[layer])
        }
        fgRef.current.addLayer(e.layer)
        setPoint(e.layer.toGeoJSON()["geometry"]["coordinates"])
    }

    return (
        <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "60vh", borderRadius: "0.25rem" }}
            className={`rounded-xl ${className}`}>
            <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
            <FeatureGroup ref={fgRef}>
                <EditControl
                    position="topright"
                    onCreated={onCreated}
                    draw={{
                        rectangle: false,
                        circle: false,
                        circlemarker: false,
                        polyline: false,
                        polygon: false,
                        marker: true,
                    }}
                />
            </FeatureGroup>
        </MapContainer>
    )
}

const NonExactLocationSelect = ({ mapCenter, className }) => {
    const [multiLineString, setMultiLineString] = useState(null)
    const fgRef = useRef(null)
    const onCreated = (e) => {
        const newMultiLineString = []
        for (const layer in fgRef.current._layers) {
            newMultiLineString.push(fgRef.current._layers[layer].toGeoJSON()["geometry"]["coordinates"])
        }
        setMultiLineString(newMultiLineString)
    }
    return (
        <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: "60vh", borderRadius: "0.25rem" }}
            className={`rounded-xl ${className}`}>
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
                                color: "#15bfe6",
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
    )
}
const addLocationSelectQuestion = (questionText, options, key, updateAnswer) => {
    return (
        <Question questionText={questionText} key={key}>
            <LocationSelect values={options} questionId={key} updateAnswer={updateAnswer} />
        </Question>
    )
}
export default addLocationSelectQuestion
