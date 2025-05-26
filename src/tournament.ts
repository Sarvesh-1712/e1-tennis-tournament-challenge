import readline from 'readline';
import { commandLine } from './model/command-line';
import { SCORE_MATCH, GAMES_PLAYER } from './constants/command-line';
import { parseFile } from './util/file-parser';
import { Match } from './model/match';
import { fetchMatchScores } from './core/match-results';
import { fetchPlayerSummary } from './core/player-summary';

export const processTournament = (filePath: string) => {
    const tournamentMatches: Match[] = parseFile(filePath)
    
    const commands = readline.createInterface(commandLine);
    
    commands.on('line', (input)  => {
        if (input.trim().startsWith(SCORE_MATCH)) {
            console.log('Match scores summary')
            console.log(fetchMatchScores(input, tournamentMatches))
        }
        
        if (input.trim().startsWith(GAMES_PLAYER)) {
            console.log('Player summary')
            console.log(fetchPlayerSummary(input, tournamentMatches))
        }
    })
}