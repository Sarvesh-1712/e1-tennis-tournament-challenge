import { MATCH } from "../constants/tournament";
import { Player } from "./player";

export type MatchId = string;

export type Point = number; 

export interface Match {
    id: MatchId
    firstPlayer: Player
    secondPlayer: Player
    points: Point[]
}

/**
 * Check if input text starts with 'Match:'
 * 
 * @param text string
 * @returns true if matches, false otherwise
 */
export const hasMatchText = (text: string): boolean => {
    return text.startsWith(`${MATCH}:`)
}

/**
 * Extracts the Match ID from a specified text format
 * 
 * @param text text matching format "Match: match-id"
 * @param separator separator 
 * @returns match-id
 */
export const getMatchId = (text: string, separator: string): MatchId | null => {
    const matchIdItems = text.split(separator)
    if (matchIdItems.length == 2) {
        return matchIdItems[1].trim()
    }
    return null
}

/**
 * Check if given text contains a valid 0 or 1 value in the specified text
 * 
 * @param text 0 or 1
 * @returns true if either 0 or 1 found, false otherwise
 */
export const isValidPoint = (text: string): boolean => {
    return /^[01]$/.test(text)
}

/**
 * Winning a game requires a person to win 4 points, but they must be ahead by at least 2 points (deuce, advantage, game)
 * 
 * @param firstPlayerPoint first player point
 * @param secondPlayerPoint second player point
 * @returns true if first player has won, false otherwise
 */
export const hasPlayerWonByPoints = (firstPlayerPoint: Point, secondPlayerPoint: Point): boolean => {
    return firstPlayerPoint >= 4 && firstPlayerPoint - secondPlayerPoint >= 2
}