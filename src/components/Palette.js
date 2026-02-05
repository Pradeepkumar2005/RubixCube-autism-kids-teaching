import React from "react";

const COLORS = [
    { name: "White", value: "#FFFFFF" },
    { name: "Yellow", value: "#FFD500" },
    { name: "Blue", value: "#0051BA" },
    { name: "Green", value: "#009E60" },
    { name: "Red", value: "#C41E3A" },
    { name: "Orange", value: "#FF5800" },
];

export default function Palette({ selectedColor, onSelectColor }) {
    return (
        <div style={styles.paletteContainer}>
            {COLORS.map((color) => (
                <button
                    key={color.name}
                    onClick={() => onSelectColor(color.value)}
                    style={{
                        ...styles.colorBtn,
                        backgroundColor: color.value,
                        transform: selectedColor === color.value ? "scale(1.2)" : "scale(1)",
                        boxShadow: selectedColor === color.value
                            ? "0 0 10px rgba(0,0,0,0.5)"
                            : "0 2px 5px rgba(0,0,0,0.2)",
                        border: color.value === "#FFFFFF" ? "2px solid #ccc" : "2px solid white",
                    }}
                    aria-label={`Select ${color.name}`}
                />
            ))}
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
};
