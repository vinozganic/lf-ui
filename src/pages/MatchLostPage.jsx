import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Page, Spinner, MatchesList, SmallText, MediumText, SvgList } from "../components"
import { useFetch } from "use-http"
import { API_URL } from "../constants"

const MatchLostPage = () => {
    const { id } = useParams()
    const [item, setItem] = useState(null)
    const [resolved, setResolved] = useState(false)
    const [matches, setMatches] = useState([])

    const { loading: matchesLoading, error: matchesError, request: matchesRequest, response: matchesResponse } = useFetch(`${API_URL}`)
    const { loading: resolvedLoading, error: resolvedError, request: resolvedRequest, response: resolvedResponse } = useFetch(`${API_URL}`)
    const { loading: lostItemLoading, error: lostItemError, request: lostItemRequest, response: lostItemResponse } = useFetch(`${API_URL}`)

    const resolveItem = useCallback(async (body) => {
        await resolvedRequest.post(`/lost/resolve`, { lostId: id, foundId: body?.foundId })
        if (resolvedResponse.ok) {
            setResolved(true)
        }
    }, [])

    const getLostItem = useCallback(async () => {
        const lostItemData = await lostItemRequest.post(`/lost/batch`, [id])
        if (lostItemResponse.ok) {
            if (lostItemData.data[0].resolved) {
                setResolved(true)
            }
            setItem(lostItemData.data[0])
        }
    }, [lostItemRequest, lostItemResponse])

    const getMatches = useCallback(async () => {
        const matchesdata = await matchesRequest.get(`/matches/lost/${id}`)
        if (matchesResponse.ok) {
            setMatches(matchesdata.data)
        }
    }, [matchesRequest, matchesResponse])

    useEffect(() => {
        getMatches()
        getLostItem()
    }, [getMatches, getLostItem, resolved])

    return (
        <Page
            bgClassName="lg:bg-matchesHorizontal lg:bg-fixed lg:bg-cover lg:bg-no-repeat"
            className="mx-4 h-auto min-h-screen justify-center">
            {(matchesLoading || resolvedLoading || lostItemLoading) && <Spinner />}
            {item && (
                <div className="flex items-start justify-center">
                    <div className="w-full flex mb-5 lg:mx-10 lg:w-4/5 2xl:w-[80rem]">
                        <div className=" p-4 bg-gray/40 rounded-xl">
                            <div>
                                <SmallText className="flex items-end justify-start">
                                    Ključ predmeta:
                                    <MediumText className="ml-2 text-primary text-shadow-lg">{item.trackingKey}</MediumText>
                                </SmallText>
                            </div>
                            <div className="mt-3 flex gap-2 ">
                                {SvgList["info"]}
                                <SmallText className="text-sm font-semibold text-white/60">
                                    Zapišite si negdje ovaj ključ kako biste mogli pratiti status vašeg predmeta.
                                </SmallText>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {!matchesLoading && !resolvedLoading && !lostItemLoading && resolved && (
                <div>
                    <SmallText>Predmet je pronađen</SmallText>
                </div>
            )}
            {!matchesLoading && !resolvedLoading && !lostItemLoading && !resolved && (
                <MatchesList
                    matches={matches.filter((match) => match.resolved === false)}
                    item={item}
                    itemType="lost"
                    resolveItem={resolveItem}
                />
            )}
        </Page>
    )
}

export default MatchLostPage
