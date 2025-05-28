import { fetchMatchResults } from "../src/core/match-results";
import { Match } from "../src/model/match";

describe('fetchMatchResults', () => {
    it('when improper query given, then null should be returned', () => {
        const matches: Match[] = [{
            id: '01',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Kong',
            points: []
        }]
        const matchResult = fetchMatchResults('Score 02', matches)
        expect(matchResult).toBeNull();
    });
    
    it('when improper match id query given, then no match should be returned', () => {
        const matches: Match[] = [{
            id: '01',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Kong',
            points: []
        }]
        const matchResult = fetchMatchResults('Score Match 02', matches)
        expect(matchResult).toBeNull();
    });

    it('when proper match id without points given, then null should be returned', () => {
        const matches: Match[] = [{
            id: '01',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Kong',
            points: []
        }]
        const matchResult = fetchMatchResults('Score Match 01', matches)
        expect(matchResult).toBeNull();
    });

    it('when proper match id with some points given, then some match result should be returned', () => {
        const matches: Match[] = [{
            id: '01',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Kong',
            points: [0, 0, 1]
        }]
        const matchResult = fetchMatchResults('Score Match 01', matches)
        expect(matchResult).toBeDefined();
    });

    it('when first player non-winning points with incomplete set given, then match result should be incomplete', () => {
        const matches: Match[] = [{
            id: '03',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Godzilla',
            points: [
              ...Array(18).fill(0)
            ]
          }]
        const matchResult = fetchMatchResults('Score Match 03', matches)
        
        expect(matchResult).toBeDefined();
        expect(matchResult?.id).toBe(matches[0].id)
        expect(matchResult?.result).toBe('Match is incomplete')
        expect(matchResult?.setsTo).toBe('0 sets to 0')
    });

    it('when first player winning points with one set given, then match result should be incomplete', () => {
        const matches: Match[] = [{
            id: '03',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Godzilla',
            points: [
              ...Array(24).fill(0)
            ]
          }]
        const matchResult = fetchMatchResults('Score Match 03', matches)
        
        expect(matchResult).toBeDefined();
        expect(matchResult?.id).toBe(matches[0].id)
        expect(matchResult?.result).toBe('Match is incomplete')
        expect(matchResult?.setsTo).toBe('1 sets to 0')
    });

    it('when both players with one winning set given, then match result should be incomplete', () => {
        const matches: Match[] = [{
            id: '03',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Godzilla',
            points: [
              ...Array(24).fill(0),
              ...Array(24).fill(1),
            ]
          }]
        const matchResult = fetchMatchResults('Score Match 03', matches)
        
        expect(matchResult).toBeDefined();
        expect(matchResult?.id).toBe(matches[0].id)
        expect(matchResult?.result).toBe('Match is incomplete')
        expect(matchResult?.setsTo).toBe('1 sets to 1')
    });

    it('when first player winning points given, then proper match result should be returned', () => {
        const matches: Match[] = [{
            id: '03',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Godzilla',
            points: [
              ...Array(24).fill(0), 
              ...Array(24).fill(0),
            ]
          }]
        const matchResult = fetchMatchResults('Score Match 03', matches)
        
        expect(matchResult).toBeDefined();
        expect(matchResult?.id).toBe(matches[0].id)
        expect(matchResult?.result).toBe('Person Tarzan defeated Person Godzilla')
        expect(matchResult?.setsTo).toBe('2 sets to 0')
    });

    it('when second player winning points given, then proper match result should be returned', () => {
        const matches: Match[] = [{
            id: '03',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Godzilla',
            points: [
              ...Array(24).fill(1), 
              ...Array(24).fill(1),
            ]
          }]
        const matchResult = fetchMatchResults('Score Match 03', matches)
        
        expect(matchResult).toBeDefined();
        expect(matchResult?.id).toBe(matches[0].id)
        expect(matchResult?.result).toBe('Person Godzilla defeated Person Tarzan')
        expect(matchResult?.setsTo).toBe('2 sets to 0')
    });

    it('when both player winning points given , then proper match result should be returned', () => {
        const matches: Match[] = [{
            id: '03',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Godzilla',
            points: [
              ...Array(24).fill(0), 
              ...Array(24).fill(1),
              ...Array(24).fill(0),
            ]
          }]
        const matchResult = fetchMatchResults('Score Match 03', matches)

        expect(matchResult).toBeDefined();
        expect(matchResult?.id).toBe(matches[0].id)
        expect(matchResult?.result).toBe('Person Tarzan defeated Person Godzilla')
        expect(matchResult?.setsTo).toBe('2 sets to 1')
    });
})
