let turn = 0;
let boardSize = 3;

const board = Array(boardSize * boardSize).fill(NaN);
const log = document.querySelector('#log');

document.querySelectorAll(".cell").forEach((cell, i) => {
    cell.addEventListener('click', () => {

        // cell already occupied
        if (!isNaN(board[i])) {
            cell.style.animation = 'shake 0.5s';
            setTimeout(() => { cell.style.animation = 'none'; }, 500)
            return;
        }

        console.log(`cell number ${i + 1} clicked by player ${turn + 1}!`);
        board[i] = turn;

        if (turn === 0) {
            // player 1's symbol
            cell.classList.add('cell--crossed');
        } else {
            // player 2's symbol
            cell.classList.add('cell--zeroed');
        }

        // check draw condition
        if (board.every(idx => !isNaN(idx))) {
            log.textContent = 'game drew!';
            return;
        }

        // check win condition
        for (let i = 0; i < boardSize; i++) {

            let rowSum = 0;
            let colSum = 0;
            let primaryDiagonalSum = 0;
            let secondaryDiagonalSum = 0;

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

            if (rowSum == 0 || colSum == 0 || primaryDiagonalSum == 0 || secondaryDiagonalSum == 0) {
                log.textContent = `Player 1 won!`
                return;
            } else if (rowSum == boardSize || colSum == boardSize || primaryDiagonalSum == boardSize || secondaryDiagonalSum == boardSize) {
                log.textContent = `Player 2 won!`
                return;
            }
        }

        // change game turn
        turn = (turn + 1) % 2;
        log.textContent = `Player ${turn + 1}'s turn`

    })
})

