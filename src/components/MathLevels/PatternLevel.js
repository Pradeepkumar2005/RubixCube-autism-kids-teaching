import React, { useCallback } from 'react';
import BaseLevel from './BaseLevel';

export default function PatternLevel({ onBack, onComplete, score, topScore }) {

    const generatePattern = useCallback(() => {
        const types = ['colors', 'shapes', 'numbers'];
        const type = types[Math.floor(Math.random() * types.length)];

        let stages = [];

        if (type === 'colors') {
            stages = [
                {
                    type: 'concrete',
                    instruction: `Finish the pattern! Red, Blue, Red...`,
                    render: ({ onSuccess, onError }) => <PatternGame pattern={['#C41E3A', '#0051BA', '#C41E3A']} answer={'#0051BA'} options={['#C41E3A', '#0051BA']} onSuccess={onSuccess} onError={onError} />
                },
                {
                    type: 'representational', // Just repeat for now or vary slightly
                    instruction: `What comes next? Green, Yellow, Green...`,
                    render: ({ onSuccess, onError }) => <PatternGame pattern={['#009E60', '#FFD500', '#009E60']} answer={'#FFD500'} options={['#009E60', '#FFD500']} onSuccess={onSuccess} onError={onError} />
                },
                {
                    type: 'abstract',
                    instruction: `Pattern: A, B, A, ...`,
                    render: ({ onSuccess, onError }) => <PatternGame pattern={['A', 'B', 'A']} answer={'B'} options={['A', 'B']} onSuccess={onSuccess} onError={onError} isText={true} />
                }
            ];
        } else if (type === 'shapes') {
            stages = [
                {
                    type: 'concrete',
                    instruction: `Circle, Square, Circle...`,
                    render: ({ onSuccess, onError }) => <PatternGame pattern={['●', '■', '●']} answer={'■'} options={['●', '■']} onSuccess={onSuccess} onError={onError} isText={true} />
                },
                {
                    type: 'representational',
                    instruction: `Triangle, Star, Triangle...`,
                    render: ({ onSuccess, onError }) => <PatternGame pattern={['▲', '★', '▲']} answer={'★'} options={['▲', '★']} onSuccess={onSuccess} onError={onError} isText={true} />
                },
                {
                    type: 'abstract',
                    instruction: `1, 2, 1, ...`,
                    render: ({ onSuccess, onError }) => <PatternGame pattern={['1', '2', '1']} answer={'2'} options={['1', '2']} onSuccess={onSuccess} onError={onError} isText={true} />
                }
            ];
        } else {
            stages = [
                {
                    type: 'concrete',
                    instruction: `Smile, Frown, Smile...`,
                    render: ({ onSuccess, onError }) => <PatternGame pattern={['🙂', '☹️', '🙂']} answer={'☹️'} options={['🙂', '☹️']} onSuccess={onSuccess} onError={onError} isText={true} />
                },
                {
                    type: 'representational',
                    instruction: `Sun, Moon, Sun...`,
                    render: ({ onSuccess, onError }) => <PatternGame pattern={['☀️', '🌙', '☀️']} answer={'🌙'} options={['☀️', '🌙']} onSuccess={onSuccess} onError={onError} isText={true} />
                },
                {
                    type: 'abstract',
                    instruction: `X, Y, X, ...`,
                    render: ({ onSuccess, onError }) => <PatternGame pattern={['X', 'Y', 'X']} answer={'Y'} options={['X', 'Y']} onSuccess={onSuccess} onError={onError} isText={true} />
                }
            ];
        }

        return stages;
    }, []);

    return (
        <BaseLevel
            levelName="Pattern Detective"
            onBack={onBack}
            onProblemComplete={onComplete}
            generateStages={generatePattern}
            score={score}
            topScore={topScore}
        />
    );
}

function PatternGame({ pattern, answer, options, onSuccess, onError, isText = false }) {
    return (
        <div className="pattern-container">
            <div className="pattern-row" style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '30px' }}>
                {pattern.map((item, i) => (
                    <div key={i} className="pattern-item" style={{
                        width: '60px', height: '60px', borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
                        backgroundColor: isText ? 'transparent' : item,
                        border: isText ? '2px solid #333' : 'none'
                    }}>
                        {isText ? item : ''}
                    </div>
                ))}
                <div className="pattern-item question-mark" style={{
                    width: '60px', height: '60px', borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem',
                    background: '#eee', color: '#aaa', border: '2px dashed #aaa'
                }}>?</div>
            </div>

            <div className="options-row">
                {options.map((opt, i) => (
                    <button
                        key={i}
                        className="option-btn"
                        onClick={() => opt === answer ? onSuccess() : onError()}
                        style={{ backgroundColor: isText ? 'white' : opt, minWidth: '80px', minHeight: '80px' }}
                    >
                        {isText ? opt : ''}
                    </button>
                ))}
            </div>
        </div>
    );
}
