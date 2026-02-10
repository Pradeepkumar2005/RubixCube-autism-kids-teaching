import React, { useState } from "react";

export default function Interface({ onCheck, onReset, message }) {
    const [showHelp, setShowHelp] = useState(false);

    return (
        <div style={styles.container}>
            {message && <div style={styles.message}>{message}</div>}

            {showHelp && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modal}>
                        <h2>How to Play 🎨</h2>
                        <ul style={styles.list}>
                            <li><strong>Pick a Color:</strong> Select a color from the bottom palette.</li>
                            <li><strong>Paint the Cube:</strong> Click on any face of the cube to paint it.</li>
                            <li><strong>Solve Faces:</strong> Try to make all 9 stickers on a side the same color!</li>
                            <li><strong>Mismatch?</strong> Made a mistake? Just pick the correct color and paint over it!</li>
                        </ul>
                        <button onClick={() => setShowHelp(false)} style={styles.closeButton}>Got it!</button>
                    </div>
                </div>
            )}

            <div style={styles.dock}>
                <button onClick={onReset} style={{ ...styles.button, background: '#74B9FF' }}>
                    <span role="img" aria-label="reset" style={styles.icon}>🔄</span>
                    Reset
                </button>
                <div style={styles.separator}></div>
                <button onClick={() => setShowHelp(true)} style={{ ...styles.button, background: '#A29BFE' }}>
                    <span role="img" aria-label="help" style={styles.icon}>❓</span>
                    Help
                </button>
                <div style={styles.separator}></div>
                <button onClick={onCheck} style={{ ...styles.button, background: '#FAB1A0', color: '#2D3436' }}>
                    <span role="img" aria-label="game" style={styles.icon}>🎮</span>
                    Math Game
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between", // Push dock to bottom
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
    },
    message: {
        background: "rgba(255, 255, 255, 0.9)",
        padding: "15px 30px",
        borderRadius: "30px",
        fontSize: "1.8rem",
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: "bold",
        color: "#6C5CE7",
        marginTop: "20px",
        boxShadow: "0 8px 15px rgba(0,0,0,0.1)",
        pointerEvents: "auto",
        animation: "float 3s ease-in-out infinite",
    },
    dock: {
        background: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        padding: "15px 25px",
        borderRadius: "25px",
        display: "flex",
        alignItems: "center",
        gap: "20px",
        marginBottom: "20px",
        pointerEvents: "auto",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    },
    button: {
        padding: "12px 24px",
        borderRadius: "15px",
        border: "none",
        fontSize: "1.2rem",
        fontFamily: "'Fredoka', sans-serif",
        fontWeight: "bold",
        color: "white",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        transition: "transform 0.2s",
        boxShadow: "0 4px 0px rgba(0,0,0,0.1)",
    },
    separator: {
        width: "2px",
        height: "30px",
        background: "#dfe6e9",
    },
    icon: {
        fontSize: "1.5rem",
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: 'auto',
        zIndex: 100,
    },
    modal: {
        background: 'white',
        padding: '30px',
        borderRadius: '25px',
        maxWidth: '500px',
        width: '90%',
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        fontFamily: "'Fredoka', sans-serif",
    },
    list: {
        textAlign: 'left',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#2d3436',
    },
    closeButton: {
        marginTop: '20px',
        padding: '10px 30px',
        background: '#0bb783',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        fontWeight: 'bold',
    }
};
