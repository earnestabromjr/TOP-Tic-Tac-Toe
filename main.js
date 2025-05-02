const gameboard = (function() {
    // Private vars
    const rows = 3;
    const cols = 3;
    let board = Array(rows).fill().map(() => Array(cols).fill(''));

    // Private methods
    const isValidPosition = (row, col) => {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    };

    const isCellEmpty = (row, col) => {
        if (!isValidPosition(row, col)) {
            return false; // Cell is empty
        }
        return board[row][col] === ''; // Return true if cell is empty, false if occupied
    };

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
            return { success: false, message: "Game is over. Start new game." };
        }
        if (!gameboard.setCell(row, col, currentPlayer.getMarker())) {
            console.log("Cell already occupied");
            return { success: false, message: "Invalid move. Cell already occupied." };
        }
        gameboard.logBoard(); // Log the board after the move
        if (checkWinCondition(row, col, currentPlayer.getMarker())) {
            winner = currentPlayer;
            gameOver = true;
            return {
                success: true,
                gameOver: true,
                message: `${currentPlayer.getName()} wins!`,
                winner: currentPlayer.getName(),
            };
        }

        if (gameboard.fullBoard()) {
            gameOver = true;
            return {
                success: true,
                gameOver: true,
                message: "It's a draw!",
                winner: null,
            };
        }
        switchPlayer(); // Switch to the next player

        return {
            success: true,
            currentPlayer: currentPlayer.getName(),
        }
    };

    const newGame = () => {
        gameboard.resetBoard();
        currentPlayer = playerOne;
        gameOver = false;
        winner = null;
        return {
            message: "New game started!",
            currentPlayer: currentPlayer.getName(),
        };
    };

    return {
        playMove,
        newGame,
        getCurrentPlayer: () => currentPlayer,
        getPlayerOne: () => playerOne,
        getPlayerTwo: () => playerTwo,
        switchPlayer,
        getGameOver: () => gameOver,
        getWinner: () => winner,
        setGameOver: (status) => {
            gameOver = status;
        },
        getBoard: gameboard.getBoard,
        printBoard: gameboard.printBoard,
        resetBoard: gameboard.resetBoard,
        logBoard: gameboard.logBoard,
    };
})();

const displayController = {
    init: () => {
        console.log("Display Controller initialized.");
        // Initialize the game board display, event listeners, etc.

        // Vars
        const gameBoardElement = document.getElementById('gameboard');
        const board = gameboard.getBoard();
        gameBoardElement.innerHTML = ''; // Clear existing content
        board.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');

        });

    },

    updateBoard: () => {
        console.log("Updating board display...");
        // Logic to update the UI with the current gameboard state
    },

    showMessage: (message) => {
        console.log(message);
        // Logic to display messages to the user
    },

    resetDisplay: () => {
        console.log("Resetting display...");
        // Logic to reset the UI for a new game
    }
};
