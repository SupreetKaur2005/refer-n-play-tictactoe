import React from 'react';

export default function Square({ value, onClick }) {
  return (
    <button onClick={onClick} style={{
      width:100, height:100, fontSize:34, display:'flex', alignItems:'center', justifyContent:'center'
    }}>
      {value}
    </button>
  );
}
