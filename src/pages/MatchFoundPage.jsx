import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Page } from "../components"

const MatchFoundPage = () => {
    const { id } = useParams()
    const [matches, setMatches] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8000/matches?found_id=${id}`)
            .then((res) => res.json())
            .then((data) => setMatches(data))
    }, [])

    return <Page></Page>
}

export default MatchFoundPage
