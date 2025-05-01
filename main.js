const gameboard = (function() {
    // Private vars
    const rows = 3;
    const cols = 3;
    let board = Array(rows).fill().map(() => Array(cols).fill(''));

    // Private methods
    const isValidPosition = (row, col) => {
        return row >= 0 && row < rows && col >= 0 && col < cols;
    }


    // Public methods
    const getBoard = () => {
        // Return a copy of the board to prevent external modification
        return board.map(row => [...row]);
    };

    const resetBoard = () => {
        board = Array(rows).fill().map(
            () => Array(cols).fill('')
        )
        return true;
    };

    const logBoard = () => {
        console.log("Current Board:");
        board.forEach(row => {
            console.log(row.join(' | '));
        });
        console.log('---');
    };

    const checkCell = (row, col) => {
        if (!isValidPosition(row, col)) {
            return false; // Cell is empty
        }
        return board[row][col] === ''; // Return true if cell is empty, false if occupied
    };

    const getCell = (row, col) => {
        if (!isValidPosition(row, col)) {
            return null; // Invalid position
        }
        return board[row][col]; // Cell is occupied, return the marker
    };

    const setCell = (row, col, marker) => {
        if (!isValidPosition(row, col) || (!checkCell(row, col))) {
            return false; // Invalid position
        }
        board[row][col] = marker; // Set the marker in the cell
        return true; // Successfully set the cell
    };

    const printBoard = () => {
        const boardString = board.map(row => row.map(cell => cell || ' ').join(' | ')).join('\n---------\n');
        console.log(boardString);
        return boardString;
    };

    const fullBoard = () => {
        return board.every(row => row.every(cell => cell !== ''));
    };

    return {
        logBoard, // For debuging
        printBoard,
        getBoard,
        resetBoard,
        checkCell,
        getCell,
        setCell,
        fullBoard,
    };
})();

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.getName = () => this.name;
    this.getMarker = () => this.marker;
}

const gameController = (function() {
    const playerOne = new Player('Player 1', 'X');
    const playerTwo = new Player('Player 2', 'O');
    const board = gameboard;
    let currentPlayer = playerOne;
    let gameOver = false;
    const switchPlayer = () => {
        currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
    };

    const playMove = (row, col) => {
        if (gameOver) {
            console.log("Game is over");
            return;
        }
        if (board.checkCell(row, col) === false) {
            console.log("Cell already occupied");
            return;
        }
        board[row][col] = currentPlayer.getMarker(); // Place the marker in the cell
        gameboard.logBoard(); // Log the board after the move
        checkWinCondition(row, col); // Check for a win condition after the move
        switchPlayer(); // Switch to the next player
    }

    const checkWinCondition = (row, col) => {
        const marker = board[row][col];
        // Check row
        if (board[row].every(cell => cell === marker)) {
            console.log(`${currentPlayer.getName()} wins!`);
            gameOver = true;
            return;
        }
        // Check column
        if (board.every(r => r[col] === marker)) {
            console.log(`${currentPlayer.getName()} wins!`);
            gameOver = true;
            return;
        }
        // Check diagonals
        if (row === col && board.every((r, i) => r[i] === marker)) {
            console.log(`${currentPlayer.getName()} wins!`);
            gameOver = true;
            return;
        }
        if (row + col === 2 && board.every((r, i) => r[2 - i] === marker)) {
            console.log(`${currentPlayer.getName()} wins!`);
            gameOver = true;
            return;
        }
    }

    return {
        board: {
            getBoard: board.getBoard,
            resetBoard: board.resetBoard,
            checkCell: board.checkCell,
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


