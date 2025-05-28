import readline from 'readline';
import { commandLine } from './model/command-line';
import { SCORE_MATCH, GAMES_PLAYER } from './constants/command-line';
import { parseFile } from './util/file-parser';
import { Match } from './model/match';
import { fetchPlayerSummary } from './core/player-summary';
import { fetchMatchResults } from './core/match-results';

export const processTournament = (filePath: string) => {
    const tournamentMatches: Match[] = parseFile(filePath)

    // base case
    if (tournamentMatches.length == 0) {
        console.log('No matches were extracted. Try again with proper file')
        process.exit()
    } 

    // process the match scores summary query
    function processMatchScoresSummary(input: string): void {
        if (input.trim().startsWith(SCORE_MATCH)) {
            console.log('Match scores summary')

            const matchScores = fetchMatchResults(input, tournamentMatches)
            if (matchScores) console.log(matchScores)
        }
    }

    // process the player summary query
    function processPlayerSummary(input: string): void {
        if (input.trim().startsWith(GAMES_PLAYER)) {
            console.log('Player summary')

            const playerSummary = fetchPlayerSummary(input, tournamentMatches)
            if (playerSummary) console.log(playerSummary)
        }
    }
    
    // reading inputs from command line until 'EOF'
    const commands = readline.createInterface(commandLine);
    commands.on('line', (input)  => {
       processMatchScoresSummary(input)
       processPlayerSummary(input)
    })
}