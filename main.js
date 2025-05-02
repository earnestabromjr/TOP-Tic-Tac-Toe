const gameboard = (function() {
    // Private vars
    const rows = 3;
    const cols = 3;
    let board = Array(rows).fill().map(() => Array(cols).fill(''));

    // Private methods
    isValidPosition: (row, col) => {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    }

    return {
        // Public methods
        getBoard: () => {
            // Return a copy of the board to prevent external modification
            return board.map(row => [...row]);
        },

        resetBoard: () => {
            board = Array(rows).fill().map(
                () => Array(cols).fill('')
            )
            return true;
        },

        logBoard: () => {
            console.log("Current Board:");
            board.forEach(row => {
                console.log(row.join(' | '));
            });
            console.log('---');
        },

        isCellEmpty: (row, col) => {
            if (!isValidPosition(row, col)) {
                return false; // Cell is empty
            }
            return board[row][col] === ''; // Return true if cell is empty, false if occupied
        },

        getCell: (row, col) => {
            if (!isValidPosition(row, col)) {
                return null; // Invalid position
            }
            return board[row][col]; // Cell is occupied, return the marker
        },

        setCell: (row, col, marker) => {
            if (!isValidPosition(row, col) || (!isCellEmpty(row, col))) {
                return false; // Invalid position
            }
            board[row][col] = marker; // Set the marker in the cell
            return true; // Successfully set the cell
        },

        printBoard: () => {
            const boardString = board.map(row => row.map(cell => cell || ' ').join(' | ')).join('\n---------\n');
            console.log(boardString);
            return boardString;
        },

        fullBoard: () => {
            return board.every(row => row.every(cell => cell !== ''));
        },

    };
})();

function createPlayer(name, marker) {
    return {
        getName: () => name,
        getMarker: () => marker,
    };
}

const gameController = (function() {
    const playerOne = createPlayer('Player 1', 'X');
    const playerTwo = createPlayer('Player 2', 'O');
    let currentPlayer = playerOne;
    let gameOver = false;
    let winner = null;
    const switchPlayer = () => {
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
    };

    const checkWinCondition = (row, col, marker) => {
        const board = gameboard.getBoard();

        // Check row
        if (board[row].every(cell => cell === marker)) {
            return true;
        }

        // Check column
        if (board.every(r => r[col] === marker)) {
            return true;
        }

        // Check diagonals
        if (row === col) {
            let diagonalWin = true;
            for (let i = 0; i < 3; i++) {
                if (board[i][i] !== marker) {
                    diagonalWin = false;
                    break;
                }
            }
            if (diagonalWin) return true;
        }
        if (row + col === 2) {
            let antiDiagonalWin = true;
            for (let i = 0; i < 3; i++) {
                if (board[i][2 - i] !== marker) {
                    antiDiagonalWin = false;
                    break;
                }
            }
            if (antiDiagonalWin) return true;
        }

        return false; // No winner
    }

    const playMove = (row, col) => {
        if (gameOver) {
            console.log("Game is over");
            return false;
        }
        if (gameboard.setCell(row, col, currentPlayer.getMarker())) {
            console.log("Cell already occupied");
            return false;
        }
        board[row][col] = currentPlayer.getMarker(); // Place the marker in the cell
        gameboard.logBoard(); // Log the board after the move
        checkWinCondition(row, col); // Check for a win condition after the move
        switchPlayer(); // Switch to the next player
    }

    return {
        board: {
            getBoard: board.getBoard,
            resetBoard: board.resetBoard,
            isCellEmpty: board.isCellEmpty,
            getCell: board.getCell,
        },
        playMove,
        getCurrentPlayer: () => currentPlayer,
        getPlayerOne: () => playerOne,
        getPlayerTwo: () => playerTwo,
        switchPlayer,
        getGameOver: () => gameOver,
        setGameOver: (status) => {
            gameOver = status;
        },
    }
})();


