import { DEFEATED, MATCH_INCOMPLETE, SETS_TO } from "../constants/tournament"
import {  Match, MatchId } from "./match"
import { Player } from "./player"

export type Set = number

export interface MatchResult {
    id: MatchId
    setsTo: string
    result: string, 
}

// helper util to form the defeated by result
const defeatedBy = (first: Player, second: Player): string => (
    `${first} ${DEFEATED} ${second}`
)
// helper to form the sets to result
const setsTo = (firstPlayerSet: Set, secondPlayerSet: Set): string => (
    `${firstPlayerSet} ${SETS_TO} ${secondPlayerSet}`
)

// Best of 2 winning sets, wins the match
const hasMatchWon = (firstPlayerSet: Set, secondPlayerSet: Set): boolean => (
    firstPlayerSet == 2 || secondPlayerSet == 2
)

/**
 * Forming result based on the sets won by the players
 * 
 * Conditions: 
 * 1. If none of the players reached atleast 2 winning sets, then match is incomplete.
 * 2. If one player reached, then that player defeats the opponent and vice versa.
 * 
 * @param firstPlayerSet first player set points
 * @param secondPlayerSet second player set points
 * @param match match in which sets are calculated.
 * @returns resultant string
 */
export const formResult = (firstPlayerSet: Set, secondPlayerSet: Set, match: Match): string => {
    if (!hasMatchWon(firstPlayerSet, secondPlayerSet)) {
        return MATCH_INCOMPLETE
    }
    if (firstPlayerSet > secondPlayerSet) {
        return defeatedBy(match.firstPlayer, match.secondPlayer)
    }
    return defeatedBy(match.secondPlayer, match.firstPlayer)
}

/**
 * Forms the sets to based on the set points.
 * 
 * @param firstPlayerSet first player set points
 * @param secondPlayerSet second player set points
 * @returns format: ['winning set points' to 'losing set points']
 */
export const formSetsTo = (firstPlayerSet: Set, secondPlayerSet: Set): string => {
    if (firstPlayerSet >= secondPlayerSet) {
        return setsTo(firstPlayerSet, secondPlayerSet)
    }
    return setsTo(secondPlayerSet, firstPlayerSet)
}