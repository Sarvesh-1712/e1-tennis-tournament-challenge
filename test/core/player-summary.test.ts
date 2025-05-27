import { fetchPlayerSummary } from "../../src/core/player-summary";
import { Match } from "../../src/model/match";
import { Stats } from "../../src/model/stats";

describe('fetchPlayerSummary', () => {
    it('when empty matches given, stats should be zero for both won/lost', () => {
        const matches: Match[] = []
  
        const stats: Stats = fetchPlayerSummary('Games Player Person Tarzan', matches)
        expect(stats).toEqual({ won: 0, lost: 0 });
    });

    it('when matches given with improper player name queried, stats should be zero for both won/lost', () => {
        const matches: Match[] = [{
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: []
        }]
  
        const stats: Stats = fetchPlayerSummary('Games Player Person A', matches)
        expect(stats).toEqual({ won: 0, lost: 0 });
    });

    it('when matches given with no points given, stats should be zero for both won/lost', () => {
        const matches: Match[] = [{
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: []
        }]
  
        const stats: Stats = fetchPlayerSummary('Games Player Person Tarzan', matches)
        expect(stats).toEqual({ won: 0, lost: 0 });
    });

    it('when matches given with no points given, stats should be zero for both won/lost', () => {
        const matches: Match[] = [{
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: []
        }]
  
        const stats: Stats = fetchPlayerSummary('Games Player Person Kong', matches)
        expect(stats).toEqual({ won: 0, lost: 0 });
    });

    it('when matches with one point for one user given, stats should be zero for both won/lost', () => {
        const matches: Match[] = [{
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: [ 0 ]
        }]
  
        const stats: Stats = fetchPlayerSummary('Games Player Person Kong', matches)
        expect(stats).toEqual({ won: 0, lost: 0 });
    });

    it('when matches with one point for each user given, stats should be zero for both won/lost', () => {
        const matches: Match[] = [{
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: [ 0, 1 ]
        }]
  
        const stats: Stats = fetchPlayerSummary('Games Player Person Kong', matches)
        expect(stats).toEqual({ won: 0, lost: 0 });
    });

    it('when matches with near-winning point for one user given, stats should be zero for both won/lost', () => {
        const matches: Match[] = [{
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: [ 0, 0, 0, 1 ]
        }]
  
        const stats: Stats = fetchPlayerSummary('Games Player Person Tarzan', matches)
        expect(stats).toEqual({ won: 0, lost: 0 });
    });

    it('when matches with winning point for one user given, stats should be non-zero for won', () => {
        const matches: Match[] = [{
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: [ 0, 0, 0, 0, 1 ]
        }]
  
        const stats: Stats = fetchPlayerSummary('Games Player Person Tarzan', matches)
        expect(stats).toEqual({ won: 1, lost: 0 });
    });

    it('when matches with losing point for one user given, stats should be non-zero for lost', () => {
        const matches: Match[] = [{
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: [ 0, 0, 0, 0, 1 ]
        }]
  
        const stats: Stats = fetchPlayerSummary('Games Player Person Kong', matches)
        expect(stats).toEqual({ won: 0, lost: 1 });
    });

    it('when matches with winning points for each user given, stats should be non-zero for won', () => {
        const matches: Match[] = [{
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: [ 0, 0, 0, 0, 1, 1, 1, 1 ]
        }]
  
        const stats: Stats = fetchPlayerSummary('Games Player Person Tarzan', matches)
        expect(stats).toEqual({ won: 1, lost: 1 });

        const secondPlayer: Stats = fetchPlayerSummary('Games Player Person Kong', matches)
        expect(secondPlayer).toEqual({ won: 1, lost: 1 });
    });

    it('when matches with proper points given, stats should be non-zero for both won/lost', () => {
      const matches: Match[] = [{
        id: '01',
        firstPlayer: 'Person Tarzan',
        secondPlayer: 'Person Kong',
        points: [ 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0]
      }]

      const stats: Stats = fetchPlayerSummary('Games Player Person Tarzan', matches)
      expect(stats).toEqual({ won: 2, lost: 1 });
    });
  });