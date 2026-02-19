import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import CountingLevel from "./MathLevels/CountingLevel";
import GeometryLevel from "./MathLevels/GeometryLevel";
import PatternLevel from "./MathLevels/PatternLevel";
import MultiplicationLevel from "./MathLevels/MultiplicationLevel";
import FractionLevel from "./MathLevels/FractionLevel";

export default function MathGame({ onBack }) {
    const [currentLevel, setCurrentLevel] = useState("menu");
    const [score, setScore] = useState(0);
    const [topScore, setTopScore] = useState(
        parseInt(localStorage.getItem("mathGameTopScore")) || 0
    );

    const handleProblemComplete = () => {
        // Increment score for completing a full CRA set
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
            colors: ['#FFD500', '#009E60', '#0051BA']
        });
    };

    const commonProps = {
        onBack: () => setCurrentLevel("menu"),
        onComplete: handleProblemComplete, // Renamed for clarity in child, but keeping prop name flexible
        score: score,
        topScore: topScore
    };

    if (currentLevel === "counting") return <CountingLevel {...commonProps} />;
    if (currentLevel === "geometry") return <GeometryLevel {...commonProps} />;
    if (currentLevel === "patterns") return <PatternLevel {...commonProps} />;
    if (currentLevel === "multiplication") return <MultiplicationLevel {...commonProps} />;
    if (currentLevel === "fractions") return <FractionLevel {...commonProps} />;

    return (
        <div className="math-menu-container sensory-friendly">
            <h1 className="menu-title">Choose Your Adventure! 🚀</h1>

            <div className="score-board-menu" style={{ marginBottom: '30px', fontSize: '1.5rem', fontWeight: 'bold', color: '#6C5CE7' }}>
                <span>Star Power: {score} ⭐</span>
                <span style={{ marginLeft: '20px', opacity: 0.8 }}>Best: {topScore} 🏆</span>
            </div>

            <div className="levels-grid">
                <button className="level-card" onClick={() => setCurrentLevel("counting")} style={{ borderColor: '#0051BA' }}>
                    <span className="level-icon">123</span>
                    <span className="level-name">Counting</span>
                </button>

                <button className="level-card" onClick={() => setCurrentLevel("geometry")} style={{ borderColor: '#009E60' }}>
                    <span className="level-icon">⬡</span>
                    <span className="level-name">Shapes</span>
                </button>

                <button className="level-card" onClick={() => setCurrentLevel("patterns")} style={{ borderColor: '#FF5800' }}>
                    <span className="level-icon">●■●</span>
                    <span className="level-name">Patterns</span>
                </button>

                <button className="level-card" onClick={() => setCurrentLevel("multiplication")} style={{ borderColor: '#C41E3A' }}>
                    <span className="level-icon">×</span>
                    <span className="level-name">Grouping</span>
                </button>

                <button className="level-card" onClick={() => setCurrentLevel("fractions")} style={{ borderColor: '#FFD500' }}>
                    <span className="level-icon">½</span>
                    <span className="level-name">Fractions</span>
                </button>
            </div>

            <button className="back-button-large" onClick={onBack}>
                ⬅ Back to Cube
            </button>
        </div>
    );
}
