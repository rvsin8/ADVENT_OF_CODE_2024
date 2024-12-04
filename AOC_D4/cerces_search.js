const fs = require('fs');

const inputFile = 'input.txt';
const grid = fs.readFileSync(inputFile, 'utf-8').trim().split('\n').map(line => line.split('')); //seems like a better way to parse / format

const WORD = "XMAS";


const isValid = (x, y, rows, cols) => x >= 0 && x < rows && y >= 0 && y < cols;

const findWordOccurrences = (grid, WORD) => {
    const rows = grid.length;
    const cols = grid[0].length;
    const wordLength = WORD.length;
    let count = 0;

    const directions = [
        [0, 1],
        [1, 0],
        [1, 1],
        [1, -1],
        [0, -1],
        [-1, 0],
        [-1, -1],
        [-1, 1]
    ];

    for (let x = 0; x < rows; x++) {
        for (let y = 0; y < cols; y++) {
            for (const [dx, dy] of directions) {
                let match = true;
                for (let i = 0; i < wordLength; i++) {
                    const nx = x + i * dx;
                    const ny = y + i * dy;
                    if (!isValid(nx, ny, rows, cols) || grid[nx][ny] !== WORD[i]) {
                        match = false;
                        break;
                    }
                }
                if (match) count++;
            }
        }
    }

    return count;
};

const totalOccurrences = findWordOccurrences(grid, WORD);
console.log(totalOccurrences);

