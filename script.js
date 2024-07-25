document.addEventListener('DOMContentLoaded', function() {
    const board = document.getElementById('board');
    const cells = Array.from(document.getElementsByClassName('cell'));
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset');

    let currentPlayer = 'X';
    let gameActive = true;
    let boardState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function checkWinner() {
        for (let condition of winningConditions) {
            let [a, b, c] = condition;
            if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                return boardState[a];
            }
        }
        if (boardState.every(cell => cell !== '')) {
            return 'draw';
        }
        return null;
    }

    function handleResult(result) {
        gameActive = false;
        if (result === 'draw') {
            message.innerText = 'It\'s a draw!';
        } else {
            message.innerText = `${result} wins!`;
        }
    }

    function makeMove(index) {
        if (gameActive && boardState[index] === '') {
            boardState[index] = currentPlayer;
            cells[index].innerText = currentPlayer;
            
            let winner = checkWinner();
            if (winner) {
                handleResult(winner);
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
    }

    function resetGame() {
        boardState = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameActive = true;
        message.innerText = '';
        cells.forEach(cell => cell.innerText = '');
    }

    board.addEventListener('click', function(event) {
        if (event.target.classList.contains('cell')) {
            let index = cells.indexOf(event.target);
            makeMove(index);
        }
    });

    resetButton.addEventListener('click', resetGame);
});