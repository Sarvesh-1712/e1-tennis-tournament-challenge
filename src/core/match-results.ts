import { SCORE_MATCH } from "../constants/command-line";
import { getMatchId, hasPlayerWonByPoints, Match, MatchId } from "../model/match";
import { formResult, formSetsTo, MatchResult } from "../model/match-result";

/**
 * Calculating the match result by following specific rules:
 * 1. Winning a game requires a person to win 4 points, but they must be ahead by at least 2 points (deuce, advantage, game)
 * The first player to win 6 games wins a set. I.e:
 * - Players do NOT need to be ahead by 2 to win a set (6-5 finishes a set) 
 * - There is nothing special about that final game in a set. All games are the same. 
 *  Best of 3 sets (first to 2 sets wins).
 * 
 * Special condition: 
 * - If there is no enough sets for a particular player to be declared as winner ie. atleast 2 sets, then result will be displayed as Match as INCOMPLETE
 * 
 * @param match 
 * @returns 
 */
const calculateMatchResult = (match: Match): MatchResult | null => {
    let [firstPlayerPoints, secondPlayerPoints] = [0, 0]
    let [firstPlayerGame, secondPlayerGame] = [0, 0]
    let [firstPlayerSet, secondPlayerSet] = [0, 0]

    if (match.points.length === 0) {
        console.log('Match points are not provided')
        return null
    }

    // update the games based on the player points 
    function updateGames(): void {
        firstPlayerPoints > secondPlayerPoints ? firstPlayerGame++ : secondPlayerGame++
    }

    // update the set based on the player games
    function updateSet(): void {
        firstPlayerGame > secondPlayerGame ? firstPlayerSet++ : secondPlayerSet++
    }

    // condition: The first player to win 6 games wins a set
    function isSetWon(): boolean {
        return firstPlayerGame == 6 || secondPlayerGame == 6
    }

    // condition: Best of 3 sets (first to 2 sets wins)
    function hasMatchWon(): boolean {
        return firstPlayerSet == 2 || secondPlayerSet == 2
    }

    // reset the player points for the next game
    function resetPoints(): void {
        [firstPlayerPoints, secondPlayerPoints] = [0, 0]
    }

    // reset the game for the next set
    function resetGame(): void {
        [firstPlayerGame, secondPlayerGame] = [0, 0]
    }
 
    for (const point of match.points) {
        point === 0 ? firstPlayerPoints++ : secondPlayerPoints++

        const firstPlayerWon = hasPlayerWonByPoints(firstPlayerPoints, secondPlayerPoints)
        const secondPlayerWon = hasPlayerWonByPoints(secondPlayerPoints, firstPlayerPoints)

        if (firstPlayerWon || secondPlayerWon) {
            updateGames()
            resetPoints()

            if (isSetWon()) {
              updateSet()              
              resetGame()
            }

            if (hasMatchWon()) break
        }
    }

    return {
        id: match.id, 
        result: formResult(firstPlayerSet, secondPlayerSet, match),
        setsTo: formSetsTo(firstPlayerSet, secondPlayerSet)
    }
}

/**
 * Fetch match results based on the match id
 *  
 * @param input input query for extracting match id
 * @param matches list of tournament matches
 * @returns MatchResult
 */
export const fetchMatchResults = (input: string, matches: Match[]): MatchResult | null  => {
    const matchId: MatchId | null = getMatchId(input, `${SCORE_MATCH}`)
    const match: Match | undefined = matches.find(match => match.id === matchId)

    if (!match) {
        console.log(`Error 404: Match id: ${matchId}  not found. Try again`)
        return null;
    }
    return calculateMatchResult(match)
}