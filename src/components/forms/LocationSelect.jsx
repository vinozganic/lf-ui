import React, { useState, useRef } from "react"
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet"
import Question from "../forms/Question"
import { EditControl } from "react-leaflet-draw"
import "leaflet/dist/leaflet.css"
import "leaflet-draw/dist/leaflet.draw.css"
const LocationSelect = ({ values, questionId, updateAnswer, className }) => {
    return <NonExactLocationSelect className={className} />
}
const NonExactLocationSelect = ({ className }) => {
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
        <div className={`rounded-md bg-gray p-2 ${className}`}>
            <MapContainer
                center={[37.8189, -122.4786]}
                zoom={13}
                style={{ height: "60vh", borderRadius: "0.25rem" }}
                className="rounded-xl">
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
        </div>
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
