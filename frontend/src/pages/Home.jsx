// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence  } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [exploded, setExploded] = useState(false);
    const navigate = useNavigate(); 

    const handleButtonClick = () => {
        setExploded(true); // Trigger explosion
        setTimeout(() => navigate('/about'), 1000);
    };

    const particles = Array.from({ length: 20 }); // Number of pieces

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
            <motion.div
                style={{
                    position: 'absolute',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.1)',
                    pointerEvents: 'none',
                    transform: 'translate(-50%, -50%)',
                }}
                animate={{
                    x: cursorPosition.x - 48, // This perfectly centers the spotlight with my cursor. DO NOT REMOVE
                    y: cursorPosition.y - 430,
                }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 20,
                }}
            />

            <h1>Welcome to Yash Puranik's Personal Website</h1>
            <p>For now, the main purpose of this website is to show off my programming skills.</p>
            {/*<div>
                <p>Cursor Position: X: {cursorPosition.x}, Y: {cursorPosition.y}</p>
            </div> */}
            {!exploded && (
                <motion.button
                    style={{
                        padding: '0.8rem 1.5rem',
                        background: '#00d8ff',
                        color: '#1a1a1a',
                        border: 'none',
                        borderRadius: '5px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleButtonClick}
                >
                    Learn More About Me
                </motion.button>
            )}

            {exploded &&
                particles.map((_, index) => (
                    <motion.div
                        key={index}
                        initial={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            scale: 1,
                        }}
                        animate={{
                            opacity: 0,
                            x: Math.random() * 2000 - 1000,
                            y: Math.random() * 2000 - 1000,
                            scale: 1,
                        }}
                        transition={{
                            duration: 1,
                            ease: 'easeOut',
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            width: '10px',
                            height: '10px',
                            background: '#00d8ff',
                            borderRadius: '50%',
                        }}
                    />
                ))}
        </motion.div>
    );
};
export default Home;