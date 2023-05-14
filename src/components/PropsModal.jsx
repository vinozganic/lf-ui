import React, { useState, useEffect, useCallback } from "react"
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet"
import L from "leaflet"
import "./PropsModalStyles.css"
import { API_URL } from "../constants"
import { useFetch } from "use-http"
import { Button, SmallText, Spinner, SvgList } from "../components"

const PropsModal = ({ currentMatch, handleShowProps }) => {
    const [types, setTypes] = useState("")
    const date = new Date(currentMatch.itemData.date)
    const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
    const month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
    const year = date.getFullYear()

    const { loading: typeLoading, error: typeError, request: typeRequest, response: typeResponse } = useFetch(`${API_URL}`)

    const getTypes = useCallback(async () => {
        const types = await typeRequest.get(`/config/types`)
        if (typeResponse.ok) {
            setTypes(types.data)
        }
    }, [typeRequest, typeResponse])

    useEffect(() => {
        getTypes()
    }, [getTypes])

    let center = null

    const hasPath = currentMatch?.itemData.location.path

    if (hasPath) {
        if (currentMatch.itemData.location.path.type === "MultiLineString") {
            center = [currentMatch?.itemData.location.path.coordinates[0][0][1], currentMatch?.itemData.location.path.coordinates[0][0][0]]
        } else {
            center = [currentMatch?.itemData.location.path.coordinates[1], currentMatch?.itemData.location.path.coordinates[0]]
        }
    } else {
        center = [
            currentMatch?.itemData.location.publicTransportLines[0].coordinates[0][1],
            currentMatch?.itemData.location.publicTransportLines[0].coordinates[0][0],
        ]
    }

    return (
        <>
            {currentMatch?.showProps && typeLoading && <Spinner />}
            {currentMatch?.showProps && !typeLoading && (
                <div className="fixed inset-0 z-40 flex items-center justify-center overflow-y-auto bg-black bg-opacity-25 select-none backdrop-blur-sm">
                    <div className="relative sm:p-10 p-4 border-2 border-gray bg-gray/80 rounded-xl">
                        <SmallText className="text-center">Podaci o izgubljenoj stvari</SmallText>
                        <div className="p-4 pt-5 grid grid-cols-2 gap-x-14">
                            <div className="text-left p-2">
                                <SmallText>Vrsta:</SmallText>
                            </div>
                            <div className="text-center p-2">
                                <SmallText>{types.find((type) => type.name === currentMatch.itemData.type).niceName}</SmallText>
                            </div>
                            <div className="text-left p-2">
                                <SmallText>Boja:</SmallText>
                            </div>
                            <div className="text-center relative p-2">
                                <div
                                    className={`rounded-full w-6 h-6 absolute right-1/2 translate-x-1/2 border-white border`}
                                    style={{
                                        backgroundColor: `rgb(${currentMatch.itemData.color[0]},${currentMatch.itemData.color[1]},${currentMatch.itemData.color[2]})`,
                                    }}></div>
                            </div>
                            <div className="text-left p-2">
                                <SmallText>Datum:</SmallText>
                            </div>
                            <div className="text-center p-2">
                                <SmallText>{day + "." + month + "." + year}</SmallText>
                            </div>
                        </div>
                        <div className="text-center col-start-1 col-end-2 pb-2">
                            <MapContainer
                                style={{ height: "200px", width: "100%", border: "1px solid rgb(56,72,102)", borderRadius: "0.5rem" }}
                                center={center}
                                zoom={13}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                                tap={false}
                                dragging={false}>
                                <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                                {currentMatch.itemData.location.path?.type === "MultiLineString" && (
                                    <>
                                        {currentMatch.itemData.location.path?.coordinates.map((coords) => (
                                            <Polyline
                                                key={coords}
                                                pathOptions={{ color: "blue", weight: 5 }}
                                                positions={coords.map((innerCoords) => [innerCoords[1], innerCoords[0]])}
                                            />
                                        ))}
                                    </>
                                )}
                                {currentMatch.itemData.location.path?.type == "Point" && <Marker position={center} />}
                                {currentMatch.itemData.location.hasOwnProperty("publicTransportLines") ? (
                                    currentMatch.itemData.location.publicTransportLines.map((line) => (
                                        <Polyline
                                            key={line.coordinates}
                                            pathOptions={{ color: "red", weight: 5 }}
                                            positions={line.coordinates.map((innerCoords) => [innerCoords[1], innerCoords[0]])}
                                        />
                                    ))
                                ) : (
                                    <></>
                                )}
                            </MapContainer>
                        </div>
                        <div className="flex justify-start items-center gap-2 m-2">
                            <div>{SvgList["info"]}</div>
                            <SmallText className="text-sm font-semibold text-white/60">Legenda</SmallText>
                        </div>
                        <div className="flex justify-evenly">
                            {currentMatch.itemData.location.path?.type === "Point" && (
                                <div className="flex gap-2 m-4">
                                    <div>
                                        <SmallText className="text-white/70">Točna lokacija:</SmallText>
                                    </div>
                                    <div>
                                        <img src="/images/marker.png" alt="marker" className="w-6 h-6" />
                                    </div>
                                </div>
                            )}
                            {currentMatch.itemData.location.path?.type === "MultiLineString" && (
                                <div className="flex gap-2 m-4">
                                    <div>
                                        <SmallText className="text-white/70">Prijeđen put:</SmallText>
                                    </div>
                                    <div>
                                        <div className="rounded-full w-6 h-6 border-white border bg-[rgb(0,0,255)]"></div>
                                    </div>
                                </div>
                            )}
                            {currentMatch.itemData.location.hasOwnProperty("publicTransportLines") &&
                            currentMatch.itemData.location.publicTransportLines.length > 0 ? (
                                <div className="flex gap-2 m-4">
                                    <div>
                                        <SmallText className="text-white/70">Javni prijevoz:</SmallText>
                                    </div>
                                    <div>
                                        <div className="rounded-full w-6 h-6 border-white border bg-[rgb(255,0,0)]"></div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <Button onClick={() => handleShowProps()} className="pt-4">
                            U redu
                        </Button>
                    </div>
                </div>
            )}
        </>
    )
}

export default PropsModal
