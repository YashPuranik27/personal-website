import React from 'react';
import { motion } from 'framer-motion';

const Sorting = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{
        height: '100vh',
        background: '#1a1a1a',
        color: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <h1>Sorting Algorithms</h1>
      <p>Visualize various sorting algorithms like Bubble Sort, Merge Sort, and more.</p>
    </motion.div>
  );
};

export default Sorting;
