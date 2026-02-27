// Tic Tac Toe
const tttBoard = document.querySelector('#tttBoard');

for (let i = 0; i < 9; i++) {
    const btn = document.createElement('button');
    btn.className = 'tttCell';
    btn.type = 'button';
    btn.dataset.index = String(i);
    tttBoard.appendChild(btn);
}

const tttState = Array(9).fill("");
let tttCurrentPlayer = 'X';

tttBoard.addEventListener('click', (e) => {
    const cell = e.target;
    const index = cell.dataset.index;

    if ( !index || tttState[index]) return;

    tttState[index] = tttCurrentPlayer;
    cell.textContent = tttCurrentPlayer;

    tttCurrentPlayer = tttCurrentPlayer === 'X' ? 'O' : 'X';    
});

document.querySelector('#tttReset').addEventListener('click', () => {
    tttState.fill("");
    tttCurrentPlayer = 'X';
    document.querySelectorAll('.tttCell').forEach((cell) => cell.textContent = '');
});
