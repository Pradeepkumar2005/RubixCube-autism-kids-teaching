import React, { useCallback, useState } from 'react';
import BaseLevel from './BaseLevel';

export default function CountingLevel({ onBack, onComplete, score, topScore }) {

    const generateCountingStages = useCallback(() => {
        const targetNumber = Math.floor(Math.random() * 5) + 3; // 3 to 7
        const color = ["#0051BA", "#C41E3A", "#009E60"][Math.floor(Math.random() * 3)];
        const colorName = color === "#0051BA" ? "Blue" : color === "#C41E3A" ? "Red" : "Green";

        return [
            {
                type: 'concrete',
                instruction: `Touch ${targetNumber} ${colorName} squares.`,
                render: ({ onSuccess, onError }) => <ConcreteCounting target={targetNumber} color={color} onSuccess={onSuccess} onError={onError} />
            },
            {
                type: 'representational',
                instruction: `How many apples do you see?`,
                render: ({ onSuccess, onError }) => <RepresentationalCounting target={targetNumber} onSuccess={onSuccess} onError={onError} />
            },
            {
                type: 'abstract',
                instruction: `Select the number ${targetNumber}.`,
                render: ({ onSuccess, onError }) => <AbstractCounting target={targetNumber} onSuccess={onSuccess} onError={onError} />
            }
        ];
    }, []);

    return (
        <BaseLevel
            levelName="Counting Adventure"
            onBack={onBack}
            onProblemComplete={onComplete}
            generateStages={generateCountingStages}
            score={score}
            topScore={topScore}
        />
    );
}

// Sub-components for specific stages

function ConcreteCounting({ target, color, onSuccess, onError }) {
    const [blocks, setBlocks] = useState(Array(target).fill(false));

    const handleBlockClick = (index) => {
        const newBlocks = [...blocks];
        if (!newBlocks[index]) {
            newBlocks[index] = true;
            setBlocks(newBlocks);

            if (newBlocks.every(b => b)) {
                onSuccess();
            }
        }
    };

    return (
        <div className="counting-grid">
            {blocks.map((clicked, i) => (
                <div
                    key={i}
                    onClick={() => handleBlockClick(i)}
                    className={`counting-block ${clicked ? 'faded' : ''}`}
                    style={{ backgroundColor: color, cursor: 'pointer', border: '2px solid rgba(0,0,0,0.1)' }}
                >
                    {clicked && <span style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', fontSize: '1.5rem', color: 'white' }}>✓</span>}
                </div>
            ))}
        </div>
    );
}

function RepresentationalCounting({ target, onSuccess, onError }) {
    const options = [target, target - 1, target + 1].sort(() => Math.random() - 0.5);

    return (
        <div className="rep-container">
            <div className="icon-row" style={{ marginBottom: '20px' }}>
                {Array(target).fill("🍎").map((icon, i) => (
                    <span key={i} style={{ fontSize: '3rem', margin: '5px' }}>{icon}</span>
                ))}
            </div>
            <div className="options-row">
                {options.map((opt, i) => (
                    <button
                        key={i}
                        className="option-btn"
                        onClick={() => opt === target ? onSuccess() : onError()}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}

function AbstractCounting({ target, onSuccess, onError }) {
    const options = [target, target + 2, target - 2].filter(n => n > 0).sort(() => Math.random() - 0.5);

    return (
        <div className="abstract-container">
            <div className="number-display" style={{ fontSize: '3rem', marginBottom: '20px' }}>?</div>
            <div className="options-row">
                {options.map((opt, i) => (
                    <button
                        key={i}
                        className="option-btn"
                        onClick={() => opt === target ? onSuccess() : onError()}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
