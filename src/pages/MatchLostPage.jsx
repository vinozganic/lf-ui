import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Page } from "../components"

const MatchLostPage = () => {
    const { id } = useParams()
    const [matches, setMatches] = useState([])

    const getMatches = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_MATCHES_URI}/lost/${id}`)
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

export default MatchLostPage
