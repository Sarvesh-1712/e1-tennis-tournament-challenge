import fs from 'fs';

import { 
    getMatchId, 
    hasMatchText, 
    isValidPoint, 
    Match, 
    MatchId, 
    Point 
} from "../model/match";

import { getPlayers, Player } from "../model/player";

const SEMICOLON = ':'

/**
 * Read the match contents from file and convert to Match[] 
 * 
 * @param pathToFile given file path
 * @returns list of matches
 */
export const parseFile = (pathToFile: string): Match[] => {

    // reading file contents
    function readFileContents(): string[] {
        return fs.readFileSync(pathToFile, 'utf-8')
        .split('\n')
        .filter(content => content != "")
        .map(content => content.trim())
    }

    // skip the lines or unexpected lines up front
    function skipToFetchingMatchId(): number {
        let index = 0    
        for(index = 0; index < contentsLength; index++) {
            if (hasMatchText(contents[index])) {
                break
            } 
            index++
        }
        return index
    }

    const contents = readFileContents()
    const matches: Match[] = []
    const contentsLength = contents.length
    
    let i = skipToFetchingMatchId()
    while (i < contentsLength) {
        // extract match id
        const id: MatchId | null = getMatchId(contents[i++], SEMICOLON)
        if (!id) {
            console.log(`Failed to extract Match ID at line: ${i}. Please check before proceeding`)
            return []
        }
        // extract players
        const players: Player[] | null = getPlayers(contents[i++])
        if (!players) {
            console.log(`Failed to extract players at line: ${i}. Please check before proceeding`)
            return []
        }
        // extract points
        const points: Point[] = []
        while (i < contentsLength && !hasMatchText(contents[i])) {
            const content = contents[i++]
            if (isValidPoint(content)) {
                points.push(Number(content))
            }
        }

        // form the matches
        matches.push({
            id, 
            firstPlayer: players[0],
            secondPlayer: players[1],
            points
        })
    }

    return matches;
}