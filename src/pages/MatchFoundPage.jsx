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
                        <div className=" p-4 bg-gray/40 rounded-xl">
                            <div>
                                <SmallText className="flex items-end justify-start">
                                    Ključ predmeta:
                                    <MediumText className="ml-2 text-primary text-shadow-lg">{item.trackingKey}</MediumText>
                                </SmallText>
                            </div>
                            <div className="mt-3 flex gap-2 ">
                                { SvgList["info"] }
                                <SmallText className="text-sm font-semibold text-white/60">
                                    Zapišite si negdje ovaj ključ kako biste mogli pratiti status vašeg predmeta.
                                </SmallText>
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
