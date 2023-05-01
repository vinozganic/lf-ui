import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "use-http"
import { Page, Spinner, MatchesList } from "../components"
import { API_URL } from "../constants"

const MatchLostPage = () => {
    const { id } = useParams()
    const { matchesLoading, matchesError, data: { data: matches = [] } = {} } = useFetch(`${API_URL}/matches/found/${id}`, {}, [])
    let { itemLoading, itemError, data: { data: item = {} } = {} } = useFetch(`${API_URL}/found/batch`, { method: "POST", body: [id] }, [])
    item = item[0]

    return (
        <Page className="h-auto min-h-screen bg-matchesVertical lg:bg-matchesHorizontal bg-fixed bg-cover bg-no-repeat justify-center">
            {(matchesLoading || itemLoading) && <Spinner />}
            {matches && item && <MatchesList matches={matches} lostItem={false} item={item} />}
        </Page>
    )
}

export default MatchLostPage
