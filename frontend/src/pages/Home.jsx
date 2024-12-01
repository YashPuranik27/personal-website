// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Home = () => {

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
                position: 'relative',
                height: '100vh',
                background: '#1a1a1a',
                color: '#fff',
                textAlign: 'center',
                paddingTop: '20%',
            }}
        >
            <h1>Welcome to Yash Puranik's Personal Website</h1>
            <p>Showcasing my programming skills and projects to potential employers.</p>
            <div>
                <p>Cursor Position: X: {cursorPosition.x}, Y: {cursorPosition.y}</p>
            </div>
        </motion.div>
    );
};

export default Home;