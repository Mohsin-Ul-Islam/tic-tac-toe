let turn = 0;

const board = Array(9).fill(NaN);
const log = document.querySelector('#log');

for (let i = 0; i < 9; i++) {
    let cell = document.querySelector(`#cell-${i + 1}`);
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
        for (let i = 0; i < 3; i++) {

            let rowSum = 0;
            for (let j = 0; j < 3; j++) {
                const idx = i * 3 + j;
                rowSum += board[idx];
            }

            if (rowSum == 0) {
                log.textContent = `Player 1 won!`
                return;
            } else if (rowSum == 3) {
                log.textContent = `Player 2 won!`
                return;
            }
        }

        // change game turn
        turn = (turn + 1) % 2;
        log.textContent = `Player ${turn + 1}'s turn`

    });
}

