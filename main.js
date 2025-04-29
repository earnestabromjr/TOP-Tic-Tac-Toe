const gameboard = (function() {
    const board = [];
    const rows = 3;
    const cols = 3;
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i][j] = ''; // Initialize each cell to an empty string
        }
    }

    const logBoard = () => {
        console.log(board.map(row => row.join('x | ')).join('\n'));
    };

    const getBoard = () => board;

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j] = ''; // Reset each cell to an empty string
            }
        }
    };
    const checkCell = (row, col) => {
        if (row[col] === '') {
            return false; // Cell is empty
        }
    };

    const getCell = (row, col) => {
        return row[col]; // Cell is occupied, return the marker
    }



    return {
        getBoard,
        logBoard,
        resetBoard,
        checkCell,
        getCell,
    };
})();

function Player(name, marker) {
    this.name = name;
    this.marker = marker;

    this.getName = () => this.name;
    this.getMarker = () => this.marker;
}

const gameController = (function() {
    board = gameboard.getBoard();
    const playerOne = new Player('Player 1', 'X');
    const playerTwo = new Player('Player 2', 'O');

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
        if (board[row][col]) {
            console.log("Cell already occupied");
            return;
        } else {
            board[row][col] = currentPlayer.getMarker(); // Place the marker in the cell
            gameboard.logBoard(); // Log the board after the move
            checkWinCondition(row, col); // Check for a win condition after the move
            switchPlayer(); // Switch to the next player
        }
    }

    return {
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
