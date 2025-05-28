import path from "path";
import { parseFile } from "../src/util/file-parser";

describe('FileParser', () => {
    function getFilePath(fileName: string) {
        return path.join(__dirname, `/data/${fileName}`)
    }

    it('returns empty array for no data found', () => {
        const result = parseFile(getFilePath('tournament_with_no_data.txt'));
        expect(result).toEqual([]);
    });

    it('skips random data and no values at the start', () => {
        const result = parseFile(getFilePath('tournament_with_random_start_data.txt'));
    
        expect(result).toEqual([
          {
            id: '01',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Kong',
            points: [0, 0],
          },
        ]);
      });
    

    it('parses one match entries correctly', () => {
      const result = parseFile(getFilePath('tournament_with_one_proper_match_data.txt'))
  
      expect(result).toEqual([
        {
          id: '01',
          firstPlayer: 'Person Tarzan',
          secondPlayer: 'Person Kong',
          points: [0, 1, 0, 1, 0],
        }
      ]);
    });

    it('parses multiple match entries correctly', () => {
        const result = parseFile(getFilePath('tournament_with_multiple_proper_match_data.txt'))
    
        expect(result).toEqual([
          {
            id: '01',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Kong',
            points: [0, 1, 0, 1],
          },
          {
            id: '02',
            firstPlayer: 'Person Tarzan',
            secondPlayer: 'Person Thunderbolts',
            points: [0, 0, 1, 1],
          }

        ]);
      });
  });