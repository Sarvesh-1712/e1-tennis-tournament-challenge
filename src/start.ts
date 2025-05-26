import readline from 'readline';
import { commandLine } from './model/commandLine';
import { SCORE_MATCH, GAMES_PLAYER } from './constants/commandLine';

if (process.argv.length < 3) {
    console.log('Error: Missing file. Please upload the tournament file for processing')
    process.exit()
}

const filePath = process.argv[2]
const tournamentMatches = [] // TODO: process the file

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