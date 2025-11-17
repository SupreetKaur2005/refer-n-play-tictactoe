// board: array of 9 items: null | 'X' | 'O'
// aiMark: 'O' (AI), playerMark: 'X'
function findWinningMove(board, mark) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (const line of lines) {
        const [a, b, c] = line;
        const vals = [board[a], board[b], board[c]];
        const marks = vals.filter(v => v === mark).length;
        const empties = line.filter(i => !board[i]);
        if (marks === 2 && empties.length === 1) return empties[0];
    }
    return -1;
}

export function aiMove(board, aiMark = 'O', playerMark = 'X') {
    // 1) win if possible
    let move = findWinningMove(board, aiMark);
    if (move !== -1) return move;

    // 2) block opponent
    move = findWinningMove(board, playerMark);
    if (move !== -1) return move;

    // 3) center
    if (!board[4]) return 4;

    // 4) corners
    const corners = [0, 2, 6, 8].filter(i => !board[i]);
    if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

    // 5) sides
    const sides = [1, 3, 5, 7].filter(i => !board[i]);
    if (sides.length) return sides[Math.floor(Math.random() * sides.length)];

    // fallback - pick random empty
    const empties = board.map((v, i) => v ? null : i).filter(v => v !== null);
    if (empties.length === 0) return -1;
    return empties[Math.floor(Math.random() * empties.length)];
}