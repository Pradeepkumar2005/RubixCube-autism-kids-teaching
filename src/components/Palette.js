import React from "react";

const COLORS = [
    { name: "White", value: "#FFFFFF" },
    { name: "Yellow", value: "#FFD500" },
    { name: "Blue", value: "#0051BA" },
    { name: "Green", value: "#009E60" },
    { name: "Red", value: "#C41E3A" },
    { name: "Orange", value: "#FF5800" },
];

export default function Palette({ selectedColor, onSelectColor, colorCounts = {} }) {
    return (
        <div style={styles.paletteContainer}>
            {COLORS.map((color) => {
                const count = colorCounts[color.value] || 0;
                // White is unlimited (base color), others max 9
                const max = 9;
                const remaining = Math.max(0, max - count);
                const isFull = color.value !== "#FFFFFF" && remaining === 0;

                return (
                    <div key={color.name} style={{ position: 'relative' }}>
                        <button
                            onClick={() => !isFull && onSelectColor(color.value)}
                            style={{
                                ...styles.colorBtn,
                                backgroundColor: color.value,
                                transform: selectedColor === color.value ? "scale(1.2)" : "scale(1)",
                                boxShadow: selectedColor === color.value
                                    ? "0 0 10px rgba(0,0,0,0.5)"
                                    : "0 2px 5px rgba(0,0,0,0.2)",
                                border: color.value === "#FFFFFF" ? "2px solid #ccc" : "2px solid white",
                                opacity: isFull ? 0.3 : 1,
                                cursor: isFull ? 'not-allowed' : 'pointer',
                                filter: isFull ? 'grayscale(100%)' : 'none'
                            }}
                            aria-label={`Select ${color.name}`}
                            disabled={isFull}
                        />
                        {color.value !== "#FFFFFF" && (
                            <span style={styles.badge}>{remaining}</span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

const styles = {
    paletteContainer: {
        display: "flex",
        gap: "15px",
        padding: "15px",
        background: "rgba(255, 255, 255, 0.9)",
        borderRadius: "20px",
        marginTop: "20px",
        justifyContent: "center",
    },
    colorBtn: {
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
    },
    badge: {
        position: 'absolute',
        bottom: -5,
        right: -5,
        background: '#2d3436',
        color: 'white',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        fontSize: '0.8rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        pointerEvents: 'none',
    }
};
