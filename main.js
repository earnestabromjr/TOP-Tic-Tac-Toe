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

    const setCell = (row, col, value) => {
        if (row < 0 || row >= rows || col < 0 || col >= cols) {
            throw new Error('Invalid cell position');
        }
        if (value !== 'X' && value !== 'O' && value !== '') {
            throw new Error('Invalid cell value');
        }
        board[row][col] = value;
    }

    const resetBoard = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                board[i][j] = ''; // Reset each cell to an empty string
            }
        }
    }

    return {
        getBoard,
        logBoard,
        setCell,
        resetBoard,
    };
})();
