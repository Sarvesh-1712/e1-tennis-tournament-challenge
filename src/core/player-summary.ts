import { hasPlayerWonByPoints, Match } from "../model/match"
import { getPlayerName, Player } from "../model/player"
import { Stats } from "../model/stats"

/**
 * Calculating the match stat by following this rule: 
 * Winning a game requires a person to win 4 points, but they must be ahead by at least 2 
 * points (deuce, advantage, game)
 * 
 * @param match match for concerned stat
 * @param player player concerned with the game
 * @returns Stats of won vs lost per match
 */
const calculateMatchStats = (match: Match, player: Player): Stats => {
    let [won, lost] = [0, 0]
    let [firstPlayerPoints, secondPlayerPoints] = [0, 0]

    // reset points for the next game
    function resetPoints(): void {
        [firstPlayerPoints, secondPlayerPoints] = [0, 0]
    }

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
            resetPoints()
        }
    })

    return {
        won,
        lost
    }
}

/**
 * Fetch the specified player summary based on the matches played
 * 
 * @param input query to get the player name
 * @param matches list of matches a particular player has played
 * @returns Stats of won vs lost across matches
 */
export const fetchPlayerSummary = (input: string, matches: Match[]): Stats | null => {
    const name: string | null = getPlayerName(input)
    if (!name) {
        console.log('Player name cannot be extracted properly')
        return null
    }

    let [won, lost] = [0, 0]
    const filteredMatches = matches.filter(match => match.firstPlayer === name || match.secondPlayer === name)

    if (filteredMatches.length === 0) {
        console.log('Player queried was not found. Please try again with proper id')
        return null
    }
    
    filteredMatches
        .forEach(match => {
            const { won: matchWon, lost: matchLost } = calculateMatchStats(match, name)
            won += matchWon
            lost += matchLost
        });

    return {
        won, 
        lost
    }
}