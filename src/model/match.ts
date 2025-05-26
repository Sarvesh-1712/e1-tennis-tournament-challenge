import { MATCH } from "../constants/tournament";
import { Player } from "./player";

export type MatchId = string;

export type Point = number; 

export interface Match {
    id: MatchId;
    firstPlayer: Player;
    secondPlayer: Player;
    points: Point[];
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
 * @returns match-id
 */
export const getMatchId = (text: string): MatchId => {
    const matchIdItems = text.split(':')
    if (matchIdItems.length == 2) {
        return matchIdItems[1].trim()
    }
    throw new Error('Match id not extracted properly')
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