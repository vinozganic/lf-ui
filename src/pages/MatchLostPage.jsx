import React, { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Page, Spinner, MatchesList, SmallText } from "../components"
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
                <div>
                    <SmallText>Ključ za praćenje: {item.trackingKey}</SmallText>
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
