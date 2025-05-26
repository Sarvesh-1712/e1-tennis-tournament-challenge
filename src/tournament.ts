import readline from 'readline';
import { commandLine } from './model/command-line';
import { SCORE_MATCH, GAMES_PLAYER } from './constants/command-line';
import { parseFile } from './util/file-parser';
import { Match } from './model/match';

export const processTournament = (filePath: string) => {
    const tournamentMatches: Match[] = parseFile(filePath)
    
    const commands = readline.createInterface(commandLine);
    
    commands.on('line', (input)  => {
        if (input.trim().startsWith(SCORE_MATCH)) {
            console.log('Score Match')
        }
        
        if (input.trim().startsWith(GAMES_PLAYER)) {
            console.log('Games Player')
        }
        //TODO: post-process
    })
}

