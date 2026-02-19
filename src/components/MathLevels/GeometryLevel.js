import React, { useCallback } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import BaseLevel from './BaseLevel';

export default function GeometryLevel({ onBack, onComplete, score, topScore }) {

    const generateGeometryStages = useCallback(() => {
        // Randomize target face color
        const colors = [
            { hex: "#009E60", name: "GREEN" },
            { hex: "#C41E3A", name: "RED" },
            { hex: "#0051BA", name: "BLUE" }
        ];
        const target = colors[Math.floor(Math.random() * colors.length)];

        return [
            {
                type: 'concrete',
                instruction: `Rotate the cube to find the ${target.name} face. Click it!`,
                render: ({ onSuccess, onError }) => <GeometryConcrete targetColor={target.hex} onSuccess={onSuccess} onError={onError} />
            },
            {
                type: 'representational',
                instruction: `How many corners (vertices) does a cube have? Count the dots.`,
                render: ({ onSuccess, onError }) => <GeometryRepresentational onSuccess={onSuccess} onError={onError} />
            },
            {
                type: 'abstract',
                instruction: `Select the name of this shape.`,
                render: ({ onSuccess, onError }) => <GeometryAbstract onSuccess={onSuccess} onError={onError} />
            }
        ];
    }, []);

    return (
        <BaseLevel
            levelName="Shape Explorer"
            onBack={onBack}
            onProblemComplete={onComplete}
            generateStages={generateGeometryStages}
            score={score}
            topScore={topScore}
        />
    );
}

function GeometryConcrete({ targetColor, onSuccess, onError }) {
    return (
        <div style={{ height: '300px', width: '100%', position: 'relative' }}>
            <Canvas camera={{ position: [3, 3, 3] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <MeshCube targetColor={targetColor} onSuccess={onSuccess} onError={onError} />
                <OrbitControls enableZoom={false} />
            </Canvas>
            <p style={{ textAlign: 'center', fontSize: '0.9rem', color: '#666', marginTop: '10px' }}>Drag to Rotate • Click the Color</p>
        </div>
    );
}

function MeshCube({ targetColor, onSuccess, onError }) {
    const colors = ["#C41E3A", "#009E60", "#0051BA", "#FFD500", "#FF5800", "#FFFFFF"];

    const handleClick = (e) => {
        e.stopPropagation();
        const materialIndex = e.face.materialIndex;
        const clickedColor = colors[materialIndex];

        if (clickedColor === targetColor) {
            onSuccess();
        } else {
            // Optional: Shake effect or visual feedback
            if (onError) onError();
        }
    };

    return (
        <mesh onClick={handleClick}>
            <boxGeometry args={[2, 2, 2]} />
            {colors.map((col, i) => (
                <meshStandardMaterial key={i} attach={`material-${i}`} color={col} />
            ))}
        </mesh>
    );
}

function GeometryRepresentational({ onSuccess, onError }) {
    return (
        <div style={{ textAlign: 'center' }}>
            <div className="vertex-cube-image" style={{ width: '200px', height: '200px', margin: '0 auto', position: 'relative' }}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                    <rect x="50" y="50" width="100" height="100" fill="transparent" stroke="#333" strokeWidth="2" />
                    <rect x="80" y="20" width="100" height="100" fill="transparent" stroke="#333" strokeWidth="2" />
                    <line x1="50" y1="50" x2="80" y2="20" stroke="#333" strokeWidth="2" />
                    <line x1="150" y1="50" x2="180" y2="20" stroke="#333" strokeWidth="2" />
                    <line x1="50" y1="150" x2="80" y2="120" stroke="#333" strokeWidth="2" />
                    <line x1="150" y1="150" x2="180" y2="120" stroke="#333" strokeWidth="2" />

                    {[
                        [50, 50], [150, 50], [50, 150], [150, 150],
                        [80, 20], [180, 20], [80, 120], [180, 120]
                    ].map((p, i) => (
                        <circle key={i} cx={p[0]} cy={p[1]} r="6" fill="#C41E3A" />
                    ))}
                </svg>
            </div>
            <div className="options-row" style={{ marginTop: '20px' }}>
                <button className="option-btn" onClick={onError}>6</button>
                <button className="option-btn" onClick={onSuccess}>8</button>
                <button className="option-btn" onClick={onError}>12</button>
            </div>
        </div>
    );
}

function GeometryAbstract({ onSuccess, onError }) {
    return (
        <div className="abstract-container">
            <div className="options-row" style={{ flexDirection: 'column', gap: '10px' }}>
                <button className="option-btn" onClick={onSuccess}>Cube</button>
                <button className="option-btn" onClick={onError}>Sphere</button>
                <button className="option-btn" onClick={onError}>Pyramid</button>
            </div>
        </div>
    );
}
