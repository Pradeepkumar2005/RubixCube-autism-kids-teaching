import React from "react";

export default function Interface({ onCheck, onReset, message }) {
    return (
        <div style={styles.container}>
            {message && <div style={styles.message}>{message}</div>}

            <div style={styles.controls}>
                <button onClick={onReset} style={styles.button}>
                    Reset Cube
                </button>
                {/* <button onClick={onCheck} style={{...styles.button, background: '#4CAF50', color: 'white'}}>
          Check!
        </button> */}
            </div>
        </div>
    );
}

const styles = {
    container: {
        position: "absolute",
        top: "20px",
        left: "0",
        width: "100%",
        pointerEvents: "none", // Let clicks pass through to canvas
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    message: {
        background: "rgba(255, 255, 255, 0.9)",
        padding: "10px 20px",
        borderRadius: "20px",
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#333",
        marginBottom: "20px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        pointerEvents: "auto",
    },
    controls: {
        display: "flex",
        gap: "10px",
        pointerEvents: "auto",
    },
    button: {
        padding: "10px 20px",
        borderRadius: "10px",
        border: "none",
        background: "#fff",
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    },
};
