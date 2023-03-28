import { React, useState} from "react"
import MatchCard from "./MatchCard"
import Modal from "./Modal"

const MatchesList = ({ matches, lostItem }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [displayMatch, setDisplayMatch] = useState("")
    const [matchesList, setMatchesList] = useState (
        matches
        .map((match, index) => (
            {...match, showProps: false, functionPassID: index, discarded: false }
        ))
        .sort((a, b) => b.match_probability - a.match_probability)
      )

    const handleShowProps = (index) => {
        const newSelectMathces = matchesList.map((match) => {
            if (index === match.functionPassID) {
                setDisplayMatch(`HARD CODED, wait for GET in found.js | ID: ${match.id}`)
                return { ...match, showProps: true}
            }
            return { ...match, showProps: false }
        })
        setMatchesList(newSelectMathces)
        setIsVisible(true)
    }

    const handleCloseModal = () => {
        setIsVisible(false)
        const newMathces = matchesList.map((match) => {
            return { ...match, showProps: false }
        })
        setMatchesList(newMathces)
        document.body.style.overflow = ''
    }

    const handleDiscard = (index) => {
        const newDiscardedMathces = matchesList.map((match) => {
            if (index === match.functionPassID) {
                const newDiscarded = !match.discarded
                if (newDiscarded) {
                    setIsVisible(false)
                    return { ...match, showProps: false, discarded: newDiscarded }    
                }
                return { ...match, discarded: newDiscarded }
            }
            return { ...match, discarded: match.discarded }
        }).sort((a, b) => {
            if (a.discarded && !b.discarded) {
              return 1;
            } else if (!a.discarded && b.discarded) {
              return -1;
            } else {
              return b.match_probability - a.match_probability;
            }
        })
        setMatchesList(newDiscardedMathces)
    }

    const lockScrollModal = () => {
            document.body.style.overflow = 'hidden'
    }

    const sortedListMatchCards = matchesList.map( (match, index) => (
            <li key={index}>
                <MatchCard probability={match.match_probability} 
                    matchId={match.id} 
                    functionPassID={match.functionPassID} 
                    lostItem={lostItem} 
                    showProps={match.showProps}
                    handleShowProps={handleShowProps}
                    handleDiscard={handleDiscard} 
                    discarded={match.discarded}
                    lockScrollModal={lockScrollModal}
                    />
            </li>
        ))

    return (
        <div className="relative flex max-md:my-0 md:my-6 lg:my-10 xl:my-14 max-lg:mx-0 lg:mx-10 xl:mx-40 max-lg:justify-center">
            <ul className="relative grid sm:gap-y-20 max-sm:gap-y-10 w-fit">
                {sortedListMatchCards}
            </ul>
            <Modal isVisible={isVisible} onClose={handleCloseModal} displayMatch={displayMatch} />
        </div>
    )
}

export default MatchesList
