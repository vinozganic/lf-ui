import { React, useState, useEffect } from 'react'
import SmallText from './SmallText'

const MatchCard = ({ match, className, itemDatas, setCurrentMatch, handleDiscard }) => {
    const [progressColor, setProgressColor] = useState('')

    useEffect(() => {
        if (match.data.matchProbability * 100 > 80) setProgressColor('bg-green')
        else if (match.data.matchProbability * 100 > 50) setProgressColor('bg-yellow')
        else return setProgressColor('bg-red')
    })

    const ProgressBar = () => {
        return (
            <div className="flex items-center justify-start w-full h-8 p-1 border-2 border-opacity-50 lg:w-full rounded-2xl border-white/50 bg-white/20">
                <div
                    className={`h-full rounded-2xl ${progressColor} px-4 flex justify-center items-center text-background font-bold`}
                    style={{ width: `${match.data.matchProbability * 100}%` }}>
                    {Math.round(match.data.matchProbability * 100, 2)}%
                </div>
            </div>
        )
    }

    return (
        <nav
            className={`max-lg:p-2 lg:px-8 lg:py-6 items-center justify-center flex
            select-none border-2 border-gray lg:hover:border-primary cursor-pointer rounded-lg w-full
            transition-all ease-in-out duration-150
            lg:hover:scale-105 lg:hover:bg-gray bg-gray/60
            ${className}`}
            onClick={() => {
                setCurrentMatch({
                    data: match.data,
                    itemData: itemDatas === null ? null : itemDatas.find((item) => item._id === match.data.lostId),
                    showProps: false,
                })
            }}>
            <div className="grid w-full lg:gap-y-10 gap-y-7">
                {
                    // Crna Ovca je "placeholder" za nickname
                }
                <SmallText className="text-center">Crna Ovca</SmallText>
                <ProgressBar />
            </div>
        </nav>
    )
}

export default MatchCard
