import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Page, MatchesList } from "../components"

const MatchFoundPage = () => {
    const { id } = useParams()
    const [matches, setMatches] = useState([
        { id: 2, found_id: 20, lost_id: 10, match_probability: 1},
        { id: 3, found_id: 20, lost_id: 11, match_probability: 0.7},
        { id: 1, found_id: 20, lost_id: 12, match_probability: 0.5},
        { id: 4, found_id: 20, lost_id: 13, match_probability: 0.4},
        { id: 5, found_id: 20, lost_id: 14, match_probability: 0.3},
        { id: 6, found_id: 20, lost_id: 15, match_probability: 0.8},
    ])

    useEffect(() => {
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
        getMatches(id)
    }, [])

    return (
        <Page className="h-auto min-h-screen bg-matchesVertical lg:bg-matchesHorizontal bg-fixed bg-cover bg-no-repeat justify-center">
            <MatchesList matches={matches} lostItem={true} />
        </Page>
    )
}

export default MatchFoundPage
