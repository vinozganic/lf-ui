import { useState, useEffect, useCallback } from 'react'
import Button from './Button'
import React from 'react'
import Spinner from './Spinner'
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet'
import './PropsModalStyles.css'
import SmallText from './SmallText'
import { API_URL } from '../constants'
import { useFetch } from 'use-http'

const PropsModal = ({ currentMatch, handleShowProps }) => {
    const [types, setTypes] = useState('')
    const date = new Date(currentMatch.itemData.date)
    const day = date.getDate()
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
    const center =
        typeof currentMatch?.itemData.location.coordinates[1] === 'number'
            ? [currentMatch?.itemData.location.coordinates[1], currentMatch?.itemData.location.coordinates[0]]
            : [currentMatch?.itemData.location.coordinates[0][0][1], currentMatch?.itemData.location.coordinates[0][0][0]]

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
                                <SmallText>{day + '.' + month + '.' + year}</SmallText>
                            </div>
                        </div>
                        <div className="text-center col-start-1 col-end-2 pb-2">
                            <MapContainer
                                style={{ height: '200px', width: '100%', border: '1px solid rgb(56,72,102)', borderRadius: '0.5rem' }}
                                center={center}
                                zoom={13}
                                scrollWheelZoom={false}
                                doubleClickZoom={false}
                                tap={false}
                                dragging={false}>
                                <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                                {currentMatch.itemData.location.type === 'MultiLineString' && (
                                    <>
                                        {currentMatch.itemData.location.coordinates.map((coords) => (
                                            <Polyline
                                                key={coords}
                                                pathOptions={{ color: 'blue', weight: 5 }}
                                                positions={coords.map((innerCoords) => [innerCoords[1], innerCoords[0]])}
                                            />
                                        ))}
                                    </>
                                )}
                                {currentMatch.itemData.location.type == 'Point' && <Marker position={center} />}
                                {currentMatch.itemData.location.hasOwnProperty('publicTransportLines') ? (
                                    currentMatch.itemData.location.publicTransportLines.map((line) => (
                                        <Polyline
                                            key={line.coordinates}
                                            pathOptions={{ color: 'red', weight: 5 }}
                                            positions={line.coordinates.map((innerCoords) => [innerCoords[1], innerCoords[0]])}
                                        />
                                    ))
                                ) : (
                                    <></>
                                )}
                            </MapContainer>
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
