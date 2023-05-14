import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Page, MatchesList, Spinner, SmallText, MediumText, SvgList } from "../components"
import { useFetch } from "use-http"
import { API_URL } from "../constants"

const MatchFoundPage = () => {
    const { id } = useParams()
    const [item, setItem] = useState(null)
    const [matches, setMatches] = useState([])
    const [resolved, setResolved] = useState(false)

    const { loading: matchesLoading, error: matchesError, request: matchesRequest, response: matchesResponse } = useFetch(`${API_URL}`)
    const {
        loading: foundItemLoading,
        error: foundItemError,
        request: foundItemRequest,
        response: foundItemResponse,
    } = useFetch(`${API_URL}`)

    const getMatches = useCallback(async () => {
        const matchesdata = await matchesRequest.get(`/matches/found/${id}`)
        if (matchesResponse.ok) {
            setMatches(matchesdata.data)
        }
    }, [matchesRequest, matchesResponse])

    const getFoundItem = useCallback(async () => {
        const foundItemData = await foundItemRequest.post(`/found/batch`, [id])
        if (foundItemResponse.ok) {
            if (foundItemData.data[0].resolved) {
                setResolved(true)
            }
            setItem(foundItemData.data[0])
        }
    }, [foundItemRequest, foundItemResponse])

    useEffect(() => {
        getMatches()
        getFoundItem()
    }, [getMatches, getFoundItem])

    return (
        <Page
            bgClassName="lg:bg-matchesHorizontal lg:bg-fixed lg:bg-cover lg:bg-no-repeat"
            className="mx-4 h-auto min-h-screen justify-center">
            {(matchesLoading || foundItemLoading) && <Spinner />}
            {item && (
                <div className="flex items-start justify-center">
                    <div className="w-full flex lg:mx-10 lg:w-4/5 2xl:w-[80rem]">
                        <div className={`${resolved ? "bg-gray rounded-xl" : ""} sm:w-2/3 md:w-1/2`}>
                            <div
                                className={`p-4 ${
                                    resolved ? "bg-[rgb(13,199,0,0.20)] bg-gra border-4 border-green/20" : "bg-gray/40"
                                } rounded-xl`}>
                                <div className="flex flex-col items-start justify-between gap-4">
                                    {resolved && (
                                        <div>
                                            <div className="flex items-center justify-start gap-2 p-1">
                                                <div className="bg-white p-2 rounded-full">{SvgList["checkmarkResolved"]}</div>
                                                <div>
                                                    <SmallText className="text-shadow-lg">PRONAĐENO</SmallText>
                                                </div>
                                            </div>
                                            <SmallText className="text-xs font-semibold text-white/60 mt-3">
                                                Ovaj predmet je označen kao pronađen. Hvala na korištenju aplikacije!
                                            </SmallText>
                                        </div>
                                    )}
                                    {resolved && <hr className="w-full border-white/50" />}
                                    <div>
                                        <SmallText className="flex items-end justify-start">
                                            Ključ predmeta:
                                            <div className="relative ml-2">
                                                <MediumText className="text-primary text-shadow-lg">{item.trackingKey}</MediumText>
                                                <MediumText className="absolute top-0 left-0 text-green/30 text-shadow-lg">
                                                    {item.trackingKey}
                                                </MediumText>
                                            </div>
                                        </SmallText>
                                    </div>
                                </div>
                                {!resolved && (
                                    <div className="mt-3 flex gap-2 ">
                                        {SvgList["info"]}
                                        <SmallText className="text-sm font-semibold text-white/60">
                                            Zapišite si negdje ovaj ključ kako biste mogli pratiti status vašeg predmeta.
                                        </SmallText>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!matchesLoading && !foundItemLoading && !resolved && (
                <MatchesList
                    matches={matches.filter((match) => match.resolved === false)}
                    item={item}
                    itemType="found"
                    resolveItem={null}
                />
            )}
        </Page>
    )
}

export default MatchFoundPage
