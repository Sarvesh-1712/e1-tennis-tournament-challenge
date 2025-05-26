import { processTournament } from "./tournament"

if (process.argv.length < 3) {
    console.log('Error: Missing file. Please upload the tournament file for processing')
    process.exit()
}

const filePath = process.argv[2]
processTournament(filePath)