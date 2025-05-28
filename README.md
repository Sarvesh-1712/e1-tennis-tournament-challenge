# e1-tennis-tournament-challenge

# Tennis Calculator

The tennis calculator is a command line application that takes a structured file containing match, player and points information as inputs and produces useful statistics based on those scores.

This calculator will used a simplified version of scoring where whoever gets to 6 games first wins the set and whoever wins 2 sets first, wins the game.

## Overview

The Tennis Calculator takes inputs in the form of a list of points of a tennis match. Given this list of points, it will calculate the "games", "sets" and "matches" results. From there it can be queried about various statistics around the input matches it received. 

## Technology stack

NodeJs + TypeScript

## Features

- Parses tennis match data from a structured file.
- Supports 4 winning points alongside being ahead of opponent by 2 points (deuce, advantage, game) to win a game. 
- Supports the first player to win 6 games wins a set. I.e:
    * Players do NOT need to be ahead by 2 to win a set (6-5 finishes a set) 
    * There is nothing special about that final game in a set. All games are the same.
- Based on the user queries given below, it processes the given points to find games, sets and match results.
  - Match results (`Score Match <id>`)
  - Player game stats (`Games Player <Player Name>`)
- Supports best of 3 sets (ie. first to 2 sets wins the game)

## Validations added

- If the file is not provided in the command line, error is printed in the screen prompting the user to upload the file.
- If the file parsing failed, then process exits smoothly without continuing to process.
- If expected format is not provided either for match or player or points in the file, the process exits without continuing to process.
  - Program is case, syntax and separator sensitive.
  - Whitespaces between the expected input query/file strings are required for proper processing.
  - For example: 
    - Giving `Match01` instead of `Match: 01` will exit the process
    - Giving `Player AvsPlayer B` instead of `Player A vs Player B` will exit the process.
- If there is no enough points to decide on the winner when processing the Match results input query, then 'Match is Incomplete' is displayed as the result.

## Project Structure

```
.
├── src/
│   ├── start.ts            # CLI entry point
│   ├── tournament.ts       # Input query processing entry point
│   ├── core/               # User query processing blocks
│   ├── util/               # Util function including file parsers
│   ├── model/              # Type definitions and interfaces
│   ├── constants/          # Command keywords and config
├── test/                   # Unit tests
│   ├── data/               # Sample input test files
├── public/                 # Input file for processing
├── package.json            # Dependencies for both dev and production
├── package-lock.json       # Locking current dependency versions for installations
├── tsconfig.json           # Typescript configuration
├── jest.config.json        # Jest configuration for tests
└── README.md
```


## Input

The input will have some header lines, and then a list of points. 
For example:, the following would result in 2 games to "Person A":

    Match: 01
    Person A vs Person B
    0
    1
    0
    1
    0
    0
    0
    0
    0
    0

    
The first row is a match id, the second row shows who is playing against whom.
After that are a series of points, where 0 is a point for the first person listed, 1 is for last person.

i.e.

| Input                | Score   |
|----------------------|---------|
| Match: 01            |         |
| Person A vs Person B |         |
| 0                    | 15 - 0  |
| 1                    | 15 - 15 |
| 0                    | 30 - 15 |
| 1                    | 30 - 30 |
| 0                    | 40 - 30 |
| 0                    | Game    |
| 0                    | 15 - 0  |
| 0                    | 30 - 0  |
| 0                    | 40 - 0  |
| 0                    | Game    |


For processing, blank lines must be ignored

## Supported Queries

### Query match result
- Query: `Score Match <id>`
- Explanation: Prints who defeated whom, and the result of the sets for the match (winning player score first).
- Example: `Score Match 02`
- Example output: 
```bash
Match Result
Match id: 02
Person C defeated Person A
2 sets to 1
```


### Query games for player
- Query: `Games Player <Player Name>`
- Explanation: Prints a summary of games won vs lost for a particular player over the tournament
- Example: `Games Player Person A`
- Example output:
```bash
Player summary
Won Lost
23  17
```

## Build & Run

### Install dependencies

```bash
npm install
```

### Build the project

```bash
npm run build
```

### Run the app

```bash
npm run dev <input-file> << EOF
<input-queries>
EOF
```

Example:
```bash
npm run dev ./public/full_tournament.txt << EOF
Score Match 01
Games Player Person A
EOF
```

## Running Tests

```bash
npm test
```

## Rules Implemented
- Winning a game requires a person to win 4 points, but they must be ahead by at least 2 points (deuce, advantage, game)
- The first player to win 6 games wins a set. I.e:
    - Players do NOT need to be ahead by 2 to win a set (6-5 finishes a set) 
    - There is nothing special about that final game in a set. All games are the same.
- Best of 3 sets (first to 2 sets wins). No tiebreak or advanced deuce rules applied.

## Future improvements
The current implementation is a CLI-based tennis match calculator. To enhance functionality and usability, the following improvements can be considered:

Making this as Full-Stack Application
- Convert to a RESTful API using Node.js
```bash
Transform the existing CLI logic into REST endpoints to allow external systems or frontend clients 
to consume match data and results via HTTP.
```

- Add a Frontend Interface using React
```bash
Develop a user-friendly web interface to allow users to:
- Upload match files
- Fetch players involved as dropdown informations.
- Query player and match summaries interactively
```

Integrate a Relational Database
```bash
Use a database such as PostgreSQL or MySQL to:
- Persist match data and results
- Support user sessions
```

