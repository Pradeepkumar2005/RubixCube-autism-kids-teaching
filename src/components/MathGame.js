import React, { useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";

const COLORS = ["#C41E3A", "#009E60", "#0051BA", "#FFD500", "#FF5800", "#FFFFFF"];
const COLOR_NAMES = {
    "#C41E3A": "Red",
    "#009E60": "Green",
    "#0051BA": "Blue",
    "#FFD500": "Yellow",
    "#FF5800": "Orange",
    "#FFFFFF": "White",
};

export default function MathGame({ onBack }) {
    const [grid, setGrid] = useState([]);
    const [question, setQuestion] = useState({});
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [message, setMessage] = useState("Let's Play!");
    const [topScore, setTopScore] = useState(
        parseInt(localStorage.getItem("mathGameTopScore")) || 0
    );

    const generateOptions = useCallback((correctAnswer) => {
        let opts = new Set([correctAnswer]);
        while (opts.size < 3) {
            let wrong = Math.max(0, correctAnswer + Math.floor(Math.random() * 5) - 2);
            if (wrong !== correctAnswer) opts.add(wrong);
        }
        setOptions(Array.from(opts).sort(() => Math.random() - 0.5));
    }, []); // setOptions is a stable setter, no need to include

    const generateLevel = useCallback(() => {
        // 1. Generate 3x3 Grid
        const newGrid = Array(9)
            .fill(null)
            .map(() => COLORS[Math.floor(Math.random() * COLORS.length)]);
        setGrid(newGrid);

        // 2. Formulate Question
        const types = ["count", "add", "sub", "mul", "div"];
        const type = types[Math.floor(Math.random() * types.length)];
        let answer = 0;
        let text = "";

        if (type === "count") {
            const targetColor = COLORS[Math.floor(Math.random() * COLORS.length)];
            answer = newGrid.filter((c) => c === targetColor).length;
            text = `Count the ${COLOR_NAMES[targetColor]} blocks!`;
        } else if (type === "add") {
            const color1 = COLORS[Math.floor(Math.random() * COLORS.length)];
            let color2 = COLORS[Math.floor(Math.random() * COLORS.length)];
            while (color1 === color2) color2 = COLORS[Math.floor(Math.random() * COLORS.length)];

            const count1 = newGrid.filter((c) => c === color1).length;
            const count2 = newGrid.filter((c) => c === color2).length;
            answer = count1 + count2;
            text = `${COLOR_NAMES[color1]} (${count1}) + ${COLOR_NAMES[color2]} (${count2}) = ?`;
        } else if (type === "sub") {
            const val1 = Math.floor(Math.random() * 10) + 5; // 5-14
            const val2 = Math.floor(Math.random() * 5) + 1;  // 1-5
            answer = val1 - val2;
            text = `${val1} - ${val2} = ?`;
        } else if (type === "mul") {
            const val1 = Math.floor(Math.random() * 5) + 1; // 1-5
            const val2 = Math.floor(Math.random() * 4) + 1; // 1-4
            answer = val1 * val2;
            text = `${val1} × ${val2} = ?`;
        } else if (type === "div") {
            const val2 = Math.floor(Math.random() * 4) + 1; // 1-4 (divisor)
            answer = Math.floor(Math.random() * 5) + 1;     // 1-5 (quotient)
            const val1 = answer * val2;                     // dividend
            text = `${val1} ÷ ${val2} = ?`;
        }

        setQuestion({ text, answer });
        generateOptions(answer);
        setMessage("Let's Play!");
    }, [generateOptions]);

    useEffect(() => {
        generateLevel();
    }, [generateLevel]);

    const handleOptionClick = (val) => {
        if (val === question.answer) {
            setMessage("Correct! 🎉");
            const newScore = score + 1;
            setScore(newScore);

            if (newScore > topScore) {
                setTopScore(newScore);
                localStorage.setItem("mathGameTopScore", newScore);
            }

            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
            });
            setTimeout(generateLevel, 1500);
        } else {
            setMessage("Oops! Score reset to 0 😢");
            setScore(0);
        }
    };

    return (
        <div className="math-game-container">
            <button className="back-button" onClick={onBack}>
                ⬅ Back to Cube
            </button>

            <div className="score-board">
                <div>Score: {score}</div>
                <div style={{ fontSize: '0.8em', opacity: 0.8 }}>Top: {topScore}</div>
            </div>

            <h2 className="question-text">{question.text}</h2>

            <div className="grid-container">
                {grid.map((color, i) => (
                    <div
                        key={i}
                        className="grid-item"
                        style={{ backgroundColor: color }}
                    />
                ))}
            </div>

            <div className="options-container">
                {options.map((opt, i) => (
                    <button key={i} className="option-button" onClick={() => handleOptionClick(opt)}>
                        {opt}
                    </button>
                ))}
            </div>

            <div className="feedback-message">{message}</div>
        </div>
    );
}
