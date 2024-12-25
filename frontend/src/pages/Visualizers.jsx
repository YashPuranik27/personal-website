import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import './Visualizers.css';
import { useNavigate } from 'react-router-dom'; 

const PathfindingCanvas = () => {
  const canvasRef = useRef(null);
  const isAnimating = useRef(false); // This track if any animation is currently running
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const gridSize = 30;
    const rows = Math.floor(canvas.height / gridSize);
    const cols = Math.floor(canvas.width / gridSize);

    const runPathfinding = () => {
      if (isAnimating.current) return; // Prevent multiple concurrent animations
      isAnimating.current = true;

      // Clear the canvas for a fresh start
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Generate grid with random obstacles
      const grid = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() > 0.85 ? 1 : 0)) // 1 represents obstacles
      );

      // Generate start point in the top-left quadrant of the screen with randomness
      let start;
      do {
        start = {
          x: Math.floor(Math.random() * (cols / 3)), // First third of the grid width
          y: Math.floor(Math.random() * (rows / 3)), // First third of the grid height
        };
      } while (grid[start.y]?.[start.x] === 1);

      // Generate end point in the bottom-right quadrant with randomness
      let end;
      do {
        end = {
          x: Math.floor(cols - 1 - Math.random() * (cols / 3)), // Last third of the grid width
          y: Math.floor(rows - 1 - Math.random() * (rows / 3)), // Last third of the grid height
        };
      } while (
        grid[end.y]?.[end.x] === 1 || // Avoid obstacles
        (end.x === start.x && end.y === start.y) // Avoid same as start
      );

      grid[start.y][start.x] = 0;
      grid[end.y][end.x] = 0;

      // Draw the entire static grid (obstacles, free cells, start, and end points)
      const drawStaticGrid = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            if (x === start.x && y === start.y) {
              ctx.fillStyle = '#00ff00'; // Green for start
            } else if (x === end.x && y === end.y) {
              ctx.fillStyle = '#ff0000'; // Red for end
            } else {
              ctx.fillStyle = grid[y][x] === 1 ? '#1a1a1a' : '#99d9ea'; // Obstacles and free cells
            }
            ctx.fillRect(x * gridSize, y * gridSize, gridSize - 1, gridSize - 1);
          }
        }
      };

      // Draw a single cell for the path
      const drawPathCell = ({ x, y }) => {
        ctx.fillStyle = '#0000ff'; // Blue for the path
        ctx.fillRect(x * gridSize, y * gridSize, gridSize - 1, gridSize - 1);

        // Redraw start and end points to ensure they remain visible
        ctx.fillStyle = '#00ff00'; // Green for start
        ctx.fillRect(start.x * gridSize, start.y * gridSize, gridSize - 1, gridSize - 1);
        ctx.fillStyle = '#ff0000'; // Red for end
        ctx.fillRect(end.x * gridSize, end.y * gridSize, gridSize - 1, gridSize - 1);
      };

      const findPath = () => {
        const queue = [{ ...start, path: [] }];
        const visited = new Set();

        while (queue.length) {
          const { x, y, path } = queue.shift();
          if (x === end.x && y === end.y) {
            return [...path, { x, y }];
          }

          visited.add(`${x},${y}`);

          // Explore neighbors
          const directions = [
            { x: x + 1, y },
            { x: x - 1, y },
            { x, y: y + 1 },
            { x, y: y - 1 },
          ];

          directions.forEach((dir) => {
            if (
              dir.x >= 0 &&
              dir.x < cols &&
              dir.y >= 0 &&
              dir.y < rows &&
              grid[dir.y]?.[dir.x] === 0 && // Only traverse free cells
              !visited.has(`${dir.x},${dir.y}`)
            ) {
              queue.push({ x: dir.x, y: dir.y, path: [...path, { x, y }] });
              visited.add(`${dir.x},${dir.y}`);
            }
          });
        }

        return []; // No path found
      };

      const animatePath = (path, delay = 200) => {
        let index = 0;

        const animate = () => {
          if (index < path.length) {
            drawPathCell(path[index]); // Draw the next cell in the path
            index++;
            setTimeout(animate, delay); // Delay for each step of the animation
          } else {
            // Final redraw to ensure start and end points remain visible
            ctx.fillStyle = '#00ff00'; // Green for start
            ctx.fillRect(start.x * gridSize, start.y * gridSize, gridSize - 1, gridSize - 1);
            ctx.fillStyle = '#ff0000'; // Red for end
            ctx.fillRect(end.x * gridSize, end.y * gridSize, gridSize - 1, gridSize - 1);

            // Wait 2 seconds and start a new grid
            isAnimating.current = false; // Mark animation as complete
            setTimeout(runPathfinding, 2000);
          }
        };

        animate();
      };

      drawStaticGrid(); // Draw the grid once initially
      const path = findPath();
      if (path.length) {
        animatePath(path, 200); // Animate the path with a 200ms delay
      } else {
        // No path found, restart after 2 seconds
        isAnimating.current = false; // Mark animation as complete
        setTimeout(runPathfinding, 2000);
      }
    };

    runPathfinding(); // Start the pathfinding loop

    return () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Cleanup on unmount
      isAnimating.current = false; // Ensure state reset
    };
  }, []);

  return <canvas ref={canvasRef} className="background-canvas" />;
};

const Visualizers = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="visualizers-container"
    >
        <div className="back-to-home">
          <button onClick={() => navigate('/')}>Back to Home</button>
        </div>
      <PathfindingCanvas />
      <div className="content">
        <h1>Algorithm Visualizers</h1>
        <p>
          Explore visualizations of searching and sorting algorithms. This section demonstrates my understanding of
          algorithms through interactive and animated visualizations.
        </p>

        <div className="button-group">
          <motion.button
            className="visualizer-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate('/sorting')} // Use navigate() to go to Sorting page
          >
            Sorting Algorithms
          </motion.button>
          <motion.button
            className="visualizer-button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Searching Algorithms
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Visualizers;
