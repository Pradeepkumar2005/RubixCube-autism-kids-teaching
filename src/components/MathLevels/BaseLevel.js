import React, { useState, useEffect } from 'react';

export default function BaseLevel({
    levelName,
    onBack,
    onProblemComplete, // Called when a full Concrete->Rep->Abstract set is done
    generateStages, // Function that returns a new set of stages
    score,
    topScore
}) {
    const [stages, setStages] = useState([]);
    const [currentStageIndex, setCurrentStageIndex] = useState(0);
    const [feedback, setFeedback] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(true);

    // Initial load
    useEffect(() => {
        const initialStages = generateStages();
        setStages(initialStages);
        setLoading(false);
    }, [generateStages]); // Depend on the generator function (must be stable/memoized in parent)

    const currentStage = stages[currentStageIndex];

    const handleSuccess = () => {
        setIsSuccess(true);
        setFeedback("Great job! 🌟");

        // Gentle transition
        setTimeout(() => {
            setIsSuccess(false);
            setFeedback("");

            if (currentStageIndex < stages.length - 1) {
                // Advance to next stage in the current problem set
                setCurrentStageIndex(currentStageIndex + 1);
            } else {
                // Problem Set Complete!
                // Trigger global score update
                onProblemComplete();

                // Generate NEW problem set
                setLoading(true);
                setTimeout(() => {
                    const newStages = generateStages();
                    setStages(newStages);
                    setCurrentStageIndex(0);
                    setLoading(false);
                }, 500); // Small pause for "Next Problem" feel
            }
        }, 1500);
    };

    const handleError = () => {
        setFeedback("Let's try again slowly... 🌱");
        setTimeout(() => setFeedback(""), 2000);
    };

    if (loading || !currentStage) {
        return <div className="math-level-container sensory-friendly">Loading...</div>;
    }

    return (
        <div className="math-level-container sensory-friendly">
            <div className="level-header">
                <button className="back-button" onClick={onBack}>⬅ Back</button>
                <h2>{levelName}</h2>
                <div className="score-display">
                    <span className="current-score">Star Power: {score} ⭐</span>
                    <span className="top-score">Best: {topScore} 🏆</span>
                </div>
            </div>

            <div className="stage-indicator">
                {stages.map((_, idx) => (
                    <div
                        key={idx}
                        className={`progress-dot ${idx <= currentStageIndex ? 'active' : ''}`}
                    />
                ))}
            </div>

            <div className="stage-content">
                <h3 className="instruction-text">{currentStage.instruction}</h3>

                <div className="interaction-area fade-in">
                    {/* Render the specific content for this stage, passing handlers */}
                    {currentStage.render({ onSuccess: handleSuccess, onError: handleError })}
                </div>
            </div>

            <div className={`feedback-message ${isSuccess ? 'success' : ''}`}>
                {feedback}
            </div>
        </div>
    );
}
