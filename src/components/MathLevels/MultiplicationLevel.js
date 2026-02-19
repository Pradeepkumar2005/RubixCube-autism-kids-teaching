import React, { useCallback } from 'react';
import BaseLevel from './BaseLevel';

export default function MultiplicationLevel({ onBack, onComplete, score, topScore }) {

    // Memoize the generation function so it doesn't change on re-renders
    const generateMultiplicationStages = useCallback(() => {
        // Randomize groups (2-5) and items (2-5)
        const groups = Math.floor(Math.random() * 4) + 2;
        const itemsPerGroup = Math.floor(Math.random() * 4) + 2;
        const total = groups * itemsPerGroup;

        return [
            {
                type: 'concrete',
                instruction: `There are ${groups} baskets. Each needs ${itemsPerGroup} apples. Tap to fill!`,
                render: ({ onSuccess, onError }) => <GroupingGame groups={groups} items={itemsPerGroup} onSuccess={onSuccess} onError={onError} />
            },
            {
                type: 'representational',
                instruction: `${groups} groups of ${itemsPerGroup} equals...?`,
                render: ({ onSuccess, onError }) => <RepMultiplication groups={groups} items={itemsPerGroup} total={total} onSuccess={onSuccess} onError={onError} />
            },
            {
                type: 'abstract',
                instruction: `Solve: ${groups} × ${itemsPerGroup} = ?`,
                render: ({ onSuccess, onError }) => <AbstractMultiplication factor1={groups} factor2={itemsPerGroup} product={total} onSuccess={onSuccess} onError={onError} />
            }
        ];
    }, []);

    return (
        <BaseLevel
            levelName="Multiplication Magic"
            onBack={onBack}
            onProblemComplete={onComplete}
            generateStages={generateMultiplicationStages}
            score={score}
            topScore={topScore}
        />
    );
}

// ========== Sub-Components ==========

function GroupingGame({ groups, items, onSuccess, onError }) {
    const [filledGroups, setFilledGroups] = React.useState(0);

    const handleGroupClick = (index) => {
        // Simple mechanic: click a group to "fill" it.
        // We can track which exact indices are filled if we want, but simple count is enough for MVP logic if we trust the user not to double click (or we disable clicked ones).
        // Let's use a Set for correctness.
    };

    // Simplified for reliability: just render visual groups that auto-fill when clicked?
    // Let's make it interactive: Click each basket to put apples in it.
    const [baskets, setBaskets] = React.useState(Array(groups).fill(false));

    const handleClick = (i) => {
        if (!baskets[i]) {
            const newBaskets = [...baskets];
            newBaskets[i] = true;
            setBaskets(newBaskets);

            // Check win
            if (newBaskets.every(b => b)) {
                onSuccess();
            }
        }
    };

    return (
        <div className="grouping-game-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
            {baskets.map((isFilled, i) => (
                <div
                    key={i}
                    onClick={() => handleClick(i)}
                    style={{
                        width: '100px', height: '100px',
                        border: '4px dashed #888', borderRadius: '15px',
                        display: 'flex', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'center',
                        cursor: 'pointer',
                        backgroundColor: isFilled ? '#FFF3E0' : 'transparent',
                        transition: 'all 0.3s'
                    }}
                >
                    {isFilled ?
                        Array(items).fill("🍎").map((apple, aIdx) => <span key={aIdx} style={{ fontSize: '1.5rem' }}>{apple}</span>)
                        : <span style={{ fontSize: '2rem', color: '#ccc' }}>+</span>
                    }
                </div>
            ))}
        </div>
    );
}

function RepMultiplication({ groups, items, total, onSuccess, onError }) {
    const options = [total, total + groups, Math.abs(total - groups)].sort(() => Math.random() - 0.5);

    return (
        <div className="rep-container">
            <div className="groups-container" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '20px' }}>
                {Array(groups).fill(0).map((_, g) => (
                    <div key={g} className="group-circle" style={{ border: '2px solid #333', borderRadius: '50%', padding: '10px', minWidth: '80px', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <div>{Array(items).fill("🍎").map((apple, i) => <span key={i}>{apple}</span>)}</div>
                    </div>
                ))}
            </div>
            <div className="options-row">
                {options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => opt === total ? onSuccess() : onError()}>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}

function AbstractMultiplication({ factor1, factor2, product, onSuccess, onError }) {
    const options = [product, product + 2, product - 2].filter(n => n > 0).sort(() => Math.random() - 0.5);

    return (
        <div className="abstract-container">
            <h1 style={{ fontSize: '3rem' }}>{factor1} × {factor2} = ?</h1>
            <div className="options-row">
                {options.map((opt, i) => (
                    <button key={i} className="option-btn" onClick={() => opt === product ? onSuccess() : onError()}>
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
}
