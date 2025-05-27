import { hasPlayerWonByPoints, Match } from "../model/match"
import { getPlayerName, Player } from "../model/player"
import { Stats } from "../model/stats"

const calculateMatchStats = (match: Match, player: Player): Stats => {
    let won = 0, lost = 0
    let [firstPlayerPoints, secondPlayerPoints] = [0, 0]

    match.points.forEach(point => {
        point === 0 ? firstPlayerPoints++ : secondPlayerPoints++

        const firstPlayerWon = hasPlayerWonByPoints(firstPlayerPoints, secondPlayerPoints)
        const secondPlayerWon = hasPlayerWonByPoints(secondPlayerPoints, firstPlayerPoints)

        if (firstPlayerWon) {
            match.firstPlayer === player ? won++ : lost++
        } else if (secondPlayerWon) {
            match.secondPlayer === player ? won++ : lost++
        }
        if (firstPlayerWon || secondPlayerWon) {
            // if any player won, reset points to be zero for the next round
            firstPlayerPoints = 0
            secondPlayerPoints = 0
        }
    })

    return {
        won,
        lost
    }
}

export const fetchPlayerSummary = (input: string, matches: Match[]): Stats => {
    const name = getPlayerName(input)
    let won = 0, lost = 0


    matches.forEach(match => {
        if (match.firstPlayer === name || match.secondPlayer === name) {
            const {won: matchWon, lost: matchLost} = calculateMatchStats(match, name) 
            won += matchWon
            lost += matchLost
        }
    })

    return {
        won, 
        lost
    }
}