import React from 'react';

function CircleButton({ id, x, y,  onClick, active }) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`circle-button ${active ? "active" : ""}`} 
      style={{ 
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 999 - id,
        position: 'absolute',  
      }}
    >
      {id}
    </div>
  );
}

export default CircleButton;
