import { GAMES_PLAYER } from "../constants/command-line";
import { Stats } from "./stats";

export type Player = string;

export const getPlayerName = (text: string): string => {
    const playerText = text.split(`${GAMES_PLAYER} `)
    if (playerText.length == 2) {
        return playerText[1].trim()
    }
    throw new Error('Player name not found')
}

export const getPlayers = (text: string): Player[] => {
    const players = text.split(' vs ')
    if (players.length !== 2) {
        throw new Error('Error: Invalid player listing format')
    }
    return [players[0], players[1]]
}