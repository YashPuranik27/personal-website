import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
            <h1>About Me</h1>
            <p>
                Hello! My name is Yash Puranik. I am a software engineer specializing in developing robust and scalable
                solutions. I have a strong passion for solving complex problems and building impactful projects.
            </p>
        </motion.div>
    );
};

export default About;
