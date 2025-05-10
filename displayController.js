const displayController = {
    boardElement: null,
    playerDisplay: null,
    resetButton: null,

    renderBoard() {
        // Clear the current board display
        this.boardElement.innerHTML = '';

        // Get the current board state
        const board = gameboard.getBoard();

        // Create rows and cells for each element in the 2D array
        board.forEach((row, rowIndex) => {
            const rowElement = document.createElement('div');
            rowElement.classList.add('row');

            row.forEach((cell, colIndex) => {
                const cellElement = document.createElement('div');
                cellElement.classList.add('cell');
                cellElement.dataset.row = rowIndex;
                cellElement.dataset.col = colIndex;

                // Display X, O or empty
                cellElement.textContent = cell;

                // Add click event to handle player moves
                cellElement.addEventListener('click', () => {
                    if (!gameController.getGameOver() && gameController.board.checkCell(rowIndex, colIndex)) {
                        gameController.playMove(rowIndex, colIndex);
                        this.renderBoard(); // Re-render after move
                        this.updateCurrentPlayer(); // Update player display after move
                    }
                });

                rowElement.appendChild(cellElement);
            });

            this.boardElement.appendChild(rowElement);
        });
    },

    updateCurrentPlayer() {
        if (this.playerDisplay) {
            const currentPlayer = gameController.getCurrentPlayer();
            this.playerDisplay.textContent = `Current Player: ${currentPlayer.getName()} (${currentPlayer.getMarker()})`;
        }
    },

    updateGameStatus(status) {
        const statusDisplay = document.getElementById('game-status');
        if (statusDisplay) {
            statusDisplay.textContent = status;
        }
    },

    init() {
        // Cache DOM elements
        this.boardElement = document.getElementById('game-board');
        this.playerDisplay = document.getElementById('current-player');
        this.resetButton = document.getElementById('reset-button');

        // Make sure the DOM elements exist
        if (!this.boardElement) {
            console.error('Game board element not found in the DOM');
            return;
        }

        this.renderBoard();
        this.updateCurrentPlayer();

        // Add reset button functionality
        if (this.resetButton) {
            this.resetButton.addEventListener('click', () => {
                gameboard.resetBoard();
                gameController.setGameOver(false);
                this.updateGameStatus('');
                this.renderBoard();
                this.updateCurrentPlayer();
            });
        }
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    displayController.init();
});