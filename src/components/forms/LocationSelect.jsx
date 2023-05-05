import React, { useState, useRef } from "react"
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import { EditControl } from "react-leaflet-draw"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
import { Button, Question } from "../../components"

const LocationSelect = ({ questionId, updateAnswer, className }) => {
    const [locationType, setLocationType] = useState(null)

    const updateLocationType = (type) => {
        setLocationType(type)
        updateAnswer(null, questionId)
    }

    const renderLocationTypeSelect = () => {
        return (
            <div className="flex flex-col items-start justify-start gap-x-12 gap-y-4 mx-2 md:flex-row md:items-end md:justify-between">
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
                    Ne znam točnu lokaciju
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

const NonExactLocationSelect = ({ updateAnswer, questionId, mapCenter, className }) => {
    const fgRef = useRef(null)
    const onCreated = (e) => {
        const newMultiLineString = []
        for (const layer in fgRef.current._layers) {
            newMultiLineString.push(fgRef.current._layers[layer].toGeoJSON()["geometry"]["coordinates"])
        }

        let answer = {
            type: "MultiLineString",
            coordinates: newMultiLineString,
            publicTransportLines: [],
        }
        updateAnswer(answer, questionId)
    }
    return (
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
