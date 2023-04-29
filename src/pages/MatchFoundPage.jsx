import React, { useState, useEffect, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { Page, MatchesList, Spinner, SmallText } from '../components'
import { useFetch } from 'use-http'
import { API_URL } from '../constants'

const MatchFoundPage = () => {
    const { id } = useParams()
    const [matches, setMatches] = useState([])
    const [resolved, setResolved] = useState(false)

    const { loading: matchesLoading, error: matchesError, request: matchesRequest, response: matchesResponse } = useFetch(`${API_URL}`)
    const { loading: foundItemLoading, error: foundItemError, request: foundItemRequest, response: foundItemResponse } = useFetch(`${API_URL}`)

    const getMatches = useCallback(async () => {
        const matchesdata = await matchesRequest.get(`/matches/found/${id}`)
        if (matchesResponse.ok) {
            setMatches(matchesdata.data)
        }
    }, [matchesRequest, matchesResponse])

    const getFoundItem = useCallback(async () => {
        const foundItemData = await foundItemRequest.post(`/found/batch`, [id])
        if (foundItemResponse.ok && foundItemData.data[0].resolved) {
            setResolved(true)
        }
    }, [foundItemRequest, foundItemResponse])

    useEffect(() => {
        getMatches()
        getFoundItem()
    }, [getMatches, getFoundItem])

    return (
        <Page className="h-auto min-h-screen justify-center ">
            {(matchesLoading || foundItemLoading) && <Spinner />}
            {!matchesLoading && !foundItemLoading && resolved && (
                <div>
                    <SmallText>Predmet je vraćen vlasniku</SmallText>
                </div>
            )}
            {!matchesLoading && !foundItemLoading && !resolved && (
                <MatchesList matches={matches.filter((match) => match.resolved === false)} lostItem={true} resolveItem={null} />
            )}
        </Page>
    )
}

export default MatchFoundPage