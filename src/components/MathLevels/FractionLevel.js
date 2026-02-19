import React, { useCallback, useState } from 'react';
import BaseLevel from './BaseLevel';

export default function FractionLevel({ onBack, onComplete, score, topScore }) {

    const generateFraction = useCallback(() => {
        // Randomize 1/2, 1/3, 1/4
        const denominators = [2, 3, 4];
        const denom = denominators[Math.floor(Math.random() * denominators.length)];
        const num = 1; // Keep numerator 1 for simplicity for now

        return [
            {
                type: 'concrete',
                instruction: `Touch ${num} part of the circle to make 1/${denom}.`,
                render: ({ onSuccess, onError }) => <PieChartConcrete numerator={num} denominator={denom} onSuccess={onSuccess} onError={onError} />
            },
            {
                type: 'representational',
                instruction: `This shows 1 out of ${denom}.`,
                render: ({ onSuccess, onError }) => <PieChartStatic numerator={num} denominator={denom} onSuccess={onSuccess} />
            },
            {
                type: 'abstract',
                instruction: `Match the fraction to the picture.`,
                render: ({ onSuccess, onError }) => <FractionAbstract numerator={num} denominator={denom} onSuccess={onSuccess} onError={onError} />
            }
        ];
    }, []);

    return (
        <BaseLevel
            levelName="Fraction Fun"
            onBack={onBack}
            onProblemComplete={onComplete}
            generateStages={generateFraction}
            score={score}
            topScore={topScore}
        />
    );
}

function PieChartConcrete({ numerator, denominator, onSuccess, onError }) {
    const [clicked, setClicked] = useState(0);

    const handleClick = () => {
        const newClicked = clicked + 1;
        setClicked(newClicked);
        if (newClicked === numerator) {
            onSuccess();
        }
    };

    // Slice size based on denominator
    const percentage = (1 / denominator) * 100;
    // NOTE: Pure CSS pies are hard for 1/3. Using Conic Gradient is better.

    return (
        <div className="pie-container" style={{ textAlign: 'center' }}>
            <div className="pie" style={{
                width: '150px', height: '150px', borderRadius: '50%', background: '#eee',
                display: 'inline-block', position: 'relative', overflow: 'hidden', cursor: 'pointer',
                border: '4px solid #fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }} onClick={handleClick}>

                {/* Visual approximation for interaction: just fill a predefined wedge on click */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                    background: clicked > 0 ? `conic-gradient(#C41E3A 0% ${360 / denominator}deg, transparent ${360 / denominator}deg)` : 'transparent',
                    transition: 'background 0.3s'
                }}></div>

                {/* Grid lines to show slices */}
                {denominator === 2 && <div style={{ position: 'absolute', width: '2px', height: '100%', background: '#fff', left: '50%' }}></div>}
                {denominator === 4 && <>
                    <div style={{ position: 'absolute', width: '2px', height: '100%', background: '#fff', left: '50%' }}></div>
                    <div style={{ position: 'absolute', width: '100%', height: '2px', background: '#fff', top: '50%' }}></div>
                </>}
                {denominator === 3 && <>
                    <div style={{ position: 'absolute', width: '2px', height: '50%', background: '#fff', left: '50%', top: 0 }}></div>
                    {/* complex rotation for others, simplify for MVP: just a gradient bg hint if unclicked? */}
                </>}
            </div>
            <p style={{ marginTop: '15px', color: '#555' }}>Tap the circle!</p>
        </div>
    );
}

function PieChartStatic({ numerator, denominator, onSuccess }) {
    return (
        <div className="pie-container" style={{ textAlign: 'center' }}>
            <div className="pie" style={{
                width: '150px', height: '150px', borderRadius: '50%', background: '#eee',
                display: 'inline-block', position: 'relative', overflow: 'hidden',
                border: '4px solid #fff', boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                background: `conic-gradient(#C41E3A 0% ${360 / denominator}deg, #eee ${360 / denominator}deg)`
            }}>
            </div>
            <div style={{ marginTop: '20px' }}>
                <button className="option-btn" onClick={onSuccess}>Continue</button>
            </div>
        </div>
    );
}

function FractionAbstract({ numerator, denominator, onSuccess, onError }) {
    const options = ["1/2", "1/3", "1/4"].sort(() => Math.random() - 0.5);
    const correct = `1/${denominator}`;

    return (
        <div className="abstract-container">
            <div className="options-row">
                {options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => opt === correct ? onSuccess() : onError()}>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
