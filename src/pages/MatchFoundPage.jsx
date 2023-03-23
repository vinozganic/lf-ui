import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Page } from "../components"

const MatchFoundPage = () => {
    const { id } = useParams()
    const [matches, setMatches] = useState([])

    const getMatches = async (id) => {
        try {
            const apiUri = import.meta.env.VITE_API_URI
            const response = await fetch(`${apiUri}/matches/found/${id}`)
            const data = await response.json()
            setMatches(data.matches)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getMatches(id)
    }, [])

    return <Page></Page>
}

export default MatchFoundPage
