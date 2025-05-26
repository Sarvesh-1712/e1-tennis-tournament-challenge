import fs from 'fs';

import { 
    getMatchId, 
    hasMatchText, 
    isValidPoint, 
    Match, 
    MatchId, 
    Point 
} from "../model/match";

import { getPlayers } from "../model/player";

/**
 * Read the match contents from file and convert to Match[] 
 * 
 * @param pathToFile given file path
 * @returns list of matches
 */
export const parseFile = (pathToFile: string): Match[] => {
    // read file contents
    const contents = fs.readFileSync(pathToFile, 'utf-8')
    .split('\n')
    .filter(content => content != "")
    .map(content => content.trim())

    const matches: Match[] = []
    const contentsLength = contents.length
    let index = 0

    // skip the lines or unexpected lines up front
    for(index = 0; index < contentsLength; index++) {
        if (hasMatchText(contents[index])) {
            break
        } 
        index++
    }

    // process the file and fill up the Match items
    let i = index
    while (i < contentsLength) {
        const id: MatchId = getMatchId(contents[i++])
        const [firstPlayer, secondPlayer] = getPlayers(contents[i++])

        const points: Point[] = []
        while (i < contentsLength && !hasMatchText(contents[i])) {
            const content = contents[i++]
            if (isValidPoint(content)) {
                points.push(Number(content))
            }
        }

        matches.push({
            id, 
            firstPlayer, 
            secondPlayer,
            points
        })
    }
    return matches;
}