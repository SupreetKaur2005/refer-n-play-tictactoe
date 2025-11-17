import React from 'react';
import Square from './Square';

export default function Board({ board, onPlay }) {
  return (
    <div style={{display:'grid', gridTemplateColumns:'repeat(3,100px)', gap:4}}>
      {board.map((val, idx) => (
        <Square key={idx} value={val} onClick={() => onPlay(idx)} />
      ))}
    </div>
  );
}
