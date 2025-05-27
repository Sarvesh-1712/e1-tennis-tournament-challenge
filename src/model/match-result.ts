import { DEFEATED, SETS_TO } from "../constants/tournament"
import { MatchId } from "./match"
import { Player } from "./player"

export type Set = number

export interface MatchResult {
    id: MatchId
    winner: Player
    runner: Player
    sets: [Set, Set]
}

export const Defeated = (first: Player, second: Player): string => {
    return `${first} ${DEFEATED} ${second}`
}

export const SetsTo = (firstPlayerSet: Set, secondPlayerSet: Set): string => {
    return `${firstPlayerSet} ${SETS_TO} ${secondPlayerSet}`
}