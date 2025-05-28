import { GAMES_PLAYER } from "../constants/command-line";

export type Player = string;

/**
 * Get player name from the input query
 * 
 * @param text player name text
 * @returns player name if found, else null
 */
export const getPlayerName = (text: string): string | null => {
    const playerText = text.split(`${GAMES_PLAYER} `)
    if (playerText.length != 2) {
        return null
    }
    return playerText[1].trim()
}

/**
 * Get the players from specified format
 * 
 * @param text input formatted string of 'Player A vs Player B' 
 * @returns two players if found, else empty list
 */
export const getPlayers = (text: string): Player[] | null => {
    const players = text.split(' vs ')
    if (players.length !== 2) {
        return null
    }
    return [players[0], players[1]]
}