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
                <div className="fixed inset-0 z-60 flex items-center justify-center overflow-y-auto bg-black bg-opacity-25 select-none backdrop-blur-sm">
                    <div className="sm:mt-32 relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3 sm:p-10 p-4 border-2 border-gray bg-gray/80 rounded-xl m-1">
                        <SmallText className="text-center">Podaci o izgubljenoj stvari</SmallText>
                        <div className="p-4 pt-5">
                            <div className="py-1 flex gap-x-8">
                                <SmallText className="w-1/4">Vrsta:</SmallText>
                                <SmallText className="text-center flex-grow">
                                    {types.find((type) => type.name === currentMatch.itemData.type).niceName}
                                </SmallText>
                            </div>
                            <div className="py-1 flex gap-x-8">
                                <SmallText className="w-1/4">Boja:</SmallText>
                                <div className="flex-grow flex justify-center">
                                    <div
                                        className={`rounded-full w-6 h-6 mx-4 border-white border`}
                                        style={{
                                            backgroundColor: `rgb(${currentMatch.itemData.color[0]},${currentMatch.itemData.color[1]},${currentMatch.itemData.color[2]})`,
                                        }}></div>
                                </div>
                            </div>
                            <div className="py-1 flex gap-x-8">
                                <SmallText className="w-1/4">Datum:</SmallText>
                                <SmallText className="flex-grow text-center">{day + "." + month + "." + year}</SmallText>
                            </div>
                        </div>
                        <div className="text-center col-start-1 col-end-2 py-1">
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
                                {currentMatch.itemData.location.path?.type === "Point" && (
                                    <>
                                        {(() => {
                                            const customIcon = L.icon({
                                                iconUrl: "/images/marker.png",
                                                iconSize: [40, 40],
                                            })
                                            return <Marker icon={customIcon} position={center} />
                                        })()}
                                    </>
                                )}
                                {currentMatch.itemData.location.hasOwnProperty("publicTransportLines") &&
                                currentMatch.itemData.location.publicTransportLines.length > 0 ? (
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
                        <div className="flex flex-col justify-evenly">
                            {currentMatch.itemData.location.path?.type === "Point" && (
                                <div className="flex gap-x-8 py-1 px-4">
                                    <div>
                                        <SmallText className="text-white/70">Točna lokacija:</SmallText>
                                    </div>
                                    <div className="w-full flex justify-center">
                                        <img src="/images/marker.png" alt="marker" className="w-6 h-6" />
                                    </div>
                                </div>
                            )}
                            {currentMatch.itemData.location.path?.type === "MultiLineString" && (
                                <div className="flex gap-x-8 py-1 px-4">
                                    <div className="w-2/5">
                                        <SmallText className="text-white/70">Prijeđen put:</SmallText>
                                    </div>
                                    <div className="flex-grow flex justify-center">
                                        <div className="rounded-full w-6 h-6 border-white border bg-[rgb(0,0,255)]"></div>
                                    </div>
                                </div>
                            )}
                            {currentMatch.itemData.location.hasOwnProperty("publicTransportLines") &&
                            currentMatch.itemData.location.publicTransportLines.length > 0 ? (
                                <div className="flex gap-x-8 py-1 px-4">
                                    <div className="w-2/5">
                                        <SmallText className="text-white/70">Javni prijevoz:</SmallText>
                                    </div>
                                    <div className="flex-grow flex justify-center">
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
