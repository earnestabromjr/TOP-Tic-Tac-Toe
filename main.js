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
        } else {
            return row[col]; // Cell is occupied, return the marker
        }

    };


    return {
        getBoard,
        logBoard,
        resetBoard,
        checkCell,
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
})();
