import React, { useState, useEffect } from 'react';
import Board from '../components/Board/Board';
import { aiMove } from '../ai/heuristicAI';

// helpers
const lines = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner(board){
  for (const [a,b,c] of lines){
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(Boolean)) return 'draw';
  return null;
}

export default function PlayPage({ user, onWinReward }) {
  const [board,setBoard] = useState(Array(9).fill(null));
  const [playerMark] = useState('X'); // player is X
  const [aiMark] = useState('O');
  const [status, setStatus] = useState('Your move');

  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      if (winner === playerMark) {
        setStatus('You win!');
        onWinReward && onWinReward();
      } else if (winner === aiMark) {
        setStatus('AI wins');
      } else if (winner === 'draw') {
        setStatus('Draw');
      }
    }
  }, [board, playerMark, aiMark, onWinReward]);

  function playerPlay(idx){
    if (board[idx] || checkWinner(board)) return;
    const newBoard = board.slice();
    newBoard[idx] = playerMark;
    setBoard(newBoard);

    // AI move (after tiny delay)
    setTimeout(() => {
      const winner = checkWinner(newBoard);
      if (winner) return;
      const move = aiMove(newBoard, aiMark, playerMark);
      if (move >= 0) {
        const nb = newBoard.slice();
        nb[move] = aiMark;
        setBoard(nb);
      }
    }, 250);
  }

  function reset(){
    setBoard(Array(9).fill(null));
    setStatus('Your move');
  }

  return (
    <div>
      <h2>Tic-Tac-Toe</h2>
      <Board board={board} onPlay={playerPlay} />
      <p>{status}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
}
