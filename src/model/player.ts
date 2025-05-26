export type Player = string;

export const getPlayers = (text: string): Player[] => {
    const players = text.split(' vs ')
    if (players.length !== 2) {
        throw new Error('Error: Invalid player listing format')
    }
    return [players[0], players[1]]
}