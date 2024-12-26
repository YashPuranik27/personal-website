import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Sorting.css'; // Import the updated CSS file

const Sorting = () => {
  const rows = 28; // Define rows
  const cols = 76; // Define columns

  // Create a blank grid structure
  const generateGrid = () => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => ({ isHighlighted: false }))
    );
  };

  // Initial starting point of the symbol
  const startingPointArrow = { row: 13, col: 24 }; // '>' starting point
  const startingPointX = { row: 14, col: 51 }; // 'X' starting point (opposite side)


  const [symbolPositionArrow, setSymbolPositionArrow] = useState(startingPointArrow);
  const [symbolPositionX, setSymbolPositionX] = useState(startingPointX);
  const [isDraggingArrow, setIsDraggingArrow] = useState(false);
  const [isDraggingX, setIsDraggingX] = useState(false);

  // Calculate the grid cell from the mouse position
  const getGridPosition = (clientX, clientY) => {
    const gridElement = document.querySelector('.sorting-grid');
    const { left, top, width, height } = gridElement.getBoundingClientRect();
    const cellWidth = width / cols;
    const cellHeight = height / rows;

    const col = Math.min(
      cols - 1,
      Math.max(0, Math.floor((clientX - left) / cellWidth))
    );
    const row = Math.min(
      rows - 1,
      Math.max(0, Math.floor((clientY - top) / cellHeight))
    );

    return { row, col };
  };

  // Handle dragging start for '>'
  const handleMouseDownArrow = (e) => {
    setIsDraggingArrow(true);
    const { row, col } = getGridPosition(e.clientX, e.clientY);
    if (!(row === symbolPositionX.row && col === symbolPositionX.col)) {
      setSymbolPositionArrow({ row, col });
    }
  };

  // Handle dragging movement for '>'
  const handleMouseMoveArrow = (e) => {
    if (!isDraggingArrow) return;

    const { row, col } = getGridPosition(e.clientX, e.clientY);
    if (!(row === symbolPositionX.row && col === symbolPositionX.col)) {
      setSymbolPositionArrow({ row, col });
    }
  };

  // Handle dragging end for '>'
  const handleMouseUpArrow = () => {
    setIsDraggingArrow(false);
  };

    // Handle dragging start for 'X'
  const handleMouseDownX = (e) => {
    setIsDraggingX(true);
    const { row, col } = getGridPosition(e.clientX, e.clientY);
    if (!(row === symbolPositionArrow.row && col === symbolPositionArrow.col)) {
      setSymbolPositionX({ row, col });
    }
  };

  // Handle dragging movement for 'X'
  const handleMouseMoveX = (e) => {
    if (!isDraggingX) return;

    const { row, col } = getGridPosition(e.clientX, e.clientY);
    if (!(row === symbolPositionArrow.row && col === symbolPositionArrow.col)) {
      setSymbolPositionX({ row, col });
    }
  };

  // Handle dragging end for 'X'
  const handleMouseUpX = () => {
    setIsDraggingX(false);
  };

  const clearBoard = () => {
    setSymbolPositionArrow(startingPointArrow); // Reset '>'
    setSymbolPositionX(startingPointX); // Reset 'X'
  };

    // Check if a symbol is at a specific cell
  const isSymbolArrowHere = (row, col) => {
    return symbolPositionArrow.row === row && symbolPositionArrow.col === col;
  };

  const isSymbolXHere = (row, col) => {
    return symbolPositionX.row === row && symbolPositionX.col === col;
  };

  const moveSymbol = (row, col) => {
    if (row >= 0 && row < rows && col >= 0 && col < cols) {
      setSymbolPosition({ row, col }); // Update the position only if within bounds
    }
  };

  const handleCellClick = (row, col) => {
    moveSymbol(row, col);
  };
  
// const isSymbolHere = (row, col) => {
//   return symbolPosition.row === row && symbolPosition.col === col;
// };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="sorting-container"
      onMouseMove={(e) => {
        handleMouseMoveArrow(e);
        handleMouseMoveX(e);
      }}
      onMouseUp={() => {
        handleMouseUpArrow();
        handleMouseUpX();
      }}
    >
      {/* Controls */}
      <div className="sorting-controls">
        <button onClick={clearBoard} className="clear-button">
          Clear Board
        </button>
      </div>

      {/* Grid */}
      <div
        className="sorting-grid"
        onMouseDown={(e) => {
          handleMouseDownArrow(e);
          handleMouseDownX(e);
        }}
        onMouseLeave={() => {
          handleMouseUpArrow();
          handleMouseUpX();
        }} // Stop dragging if mouse leaves the grid
      >
        {Array.from({ length: rows }).map((_, rowIndex) =>
          Array.from({ length: cols }).map((_, colIndex) => (
            <div key={`${rowIndex}-${colIndex}`} className="grid-cell">
              {isSymbolArrowHere(rowIndex, colIndex) && (
                <div className="symbol symbol-arrow">{'>'}</div>
              )}
              {isSymbolXHere(rowIndex, colIndex) && (
                <div className="symbol symbol-x">{'X'}</div>
              )}
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
};

export default Sorting;
