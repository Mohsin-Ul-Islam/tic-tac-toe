
window.addEventListener('load', () => {

    // mutable game state variables
    let turn = 0;
    let boardSize = 3;
    let gameOver = false;

    // references to html elements
    const logEl = document.getElementById('log');
    const boardEl = document.getElementById('board');

    // the in memory tic tac toe board
    const board = Array(boardSize * boardSize).fill(NaN);

    // create and inject cell elements into the DOM
    board.forEach((_, i) => {

        const cell = document.createElement('div');
        cell.classList.add('cell');

        cell.addEventListener('click', (evt) => {

            // prevent the browser's default click listener
            evt.preventDefault();

            // if the cell is already occupied or the game is over
            if (!isNaN(board[i]) || gameOver) {
                cell.style.animation = 'shake 0.5s';
                setTimeout(() => { cell.style.animation = 'none'; }, 500)
                return;
            }

            board[i] = turn;
            if (turn === 0) {
                // player 1's symbol
                cell.classList.add('cell--crossed');
            } else {
                // player 2's symbol
                cell.classList.add('cell--zeroed');
            }


            let primaryDiagonalSum = 0;
            let secondaryDiagonalSum = 0;

            // check win condition
            for (let i = 0; i < boardSize; i++) {

                let rowSum = 0;
                let colSum = 0;

                for (let j = 0; j < boardSize; j++) {

                    const rowIdx = i * boardSize + j;
                    const colIdx = j * boardSize + i;

                    rowSum += board[rowIdx];
                    colSum += board[colIdx];

                    if (i == j) {
                        primaryDiagonalSum += board[rowIdx];
                    }

                    if (boardSize - 1 - i == j) {
                        secondaryDiagonalSum += board[colIdx];
                    }

                }

                if (rowSum == 0 || colSum == 0) {
                    logEl.textContent = `Player 1 won!`
                    gameOver = true;
                    return;
                } else if (rowSum == boardSize || colSum == boardSize) {
                    logEl.textContent = `Player 2 won!`
                    gameOver = true;
                    return;
                }
            }

            if (primaryDiagonalSum == 0 || secondaryDiagonalSum == 0) {
                logEl.textContent = `Player 1 won!`
                gameOver = true;
                return;
            }

            if (primaryDiagonalSum == boardSize || secondaryDiagonalSum == boardSize) {
                logEl.textContent = `Player 2 won!`
                gameOver = true;
                return;
            }

            // check draw condition
            if (board.every(idx => !isNaN(idx))) {
                logEl.textContent = 'game drew!';
                gameOver = true;
                return;
            }

            // change game turn
            turn = (turn + 1) % 2;
            logEl.textContent = `Player ${turn + 1}'s turn`

        });

        boardEl.appendChild(cell);
    });

});

