import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { useFetch } from "use-http"
import { Page, Spinner } from "../components"
import { API_URL } from "../constants"

const MatchLostPage = () => {
    const { id } = useParams()
    const { loading, error, data: { matches = [] } = {} } = useFetch(`${API_URL}/matches/lost/${id}`, {}, [])

    return <Page>{loading && <Spinner />}</Page>
}

export default MatchLostPage
