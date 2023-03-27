import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Page } from "../components"

const MatchLostPage = () => {
    const { id } = useParams()
    const [matches, setMatches] = useState([])

    useEffect(() => {
        const getMatches = async (id) => {
            try {
                const apiUri = import.meta.env.VITE_API_URI
                const response = await fetch(`${apiUri}/matches/lost/${id}`)
                const data = await response.json()
                setMatches(data.matches)
            } catch (error) {
                console.log(error)
            }
        }
        getMatches(id)
    }, [])

    return <Page></Page>
}

export default MatchLostPage
