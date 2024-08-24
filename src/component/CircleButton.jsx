import React from 'react';

function CircleButton({ id, x, y,  onClick, active }) {
  return (
    <div
      onClick={() => onClick(id)}
      className={`circle-button ${active ? "active" : ""}`} // Corrected className string interpolation
      style={{ 
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 999 - id,
        position: 'absolute', // Added position for proper styling
      }}
    >
      {id}
    </div>
  );
}

export default CircleButton;
