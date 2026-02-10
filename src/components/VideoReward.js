import React from 'react';

export default function VideoReward({ onClose }) {
    return (
        <div style={styles.overlay}>
            <div style={styles.container}>
                <div style={styles.header}>
                    <h2>🎉 Awesome Job! 🎉</h2>
                    <button onClick={onClose} style={styles.closeButton}>✖</button>
                </div>

                <div style={styles.videoWrapper}>
                    <iframe
                        width="100%"
                        height="315"
                        src="https://www.youtube.com/embed/R-CZnC6p5-I?autoplay=1"
                        title="Rubiks Cube Basics"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>

                <p style={{ marginTop: '15px', fontSize: '1.2rem' }}>You solved a face! Here is how to solve the whole cube!</p>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.8)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    container: {
        background: 'white',
        padding: '20px',
        borderRadius: '20px',
        width: '90%',
        maxWidth: '600px',
        textAlign: 'center',
        fontFamily: "'Fredoka', sans-serif",
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '15px',
    },
    closeButton: {
        background: '#ff7675',
        border: 'none',
        color: 'white',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    videoWrapper: {
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    }
};
