import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Palette from "./components/Palette";
import Cube from "./components/Cube";
import Interface from "./components/Interface";
import "./App.css";

import MathGame from "./components/MathGame";
import VideoReward from "./components/VideoReward";

export default function App() {
  // 54 stickers. Initial state: all white (blank canvas)
  const [cubeState, setCubeState] = useState(Array(54).fill("#FFFFFF"));
  const [selectedColor, setSelectedColor] = useState("#C41E3A"); // Default Red
  const [message, setMessage] = useState("Pick a color and paint the cube!");
  const [view, setView] = useState("home"); // 'home' or 'game'
  const [showReward, setShowReward] = useState(false);

  const checkCompletion = (currentColors) => {
    const faces = [
      { name: "Front", start: 0 },
      { name: "Back", start: 9 },
      { name: "Top", start: 18 },
      { name: "Bottom", start: 27 },
      { name: "Right", start: 36 },
      { name: "Left", start: 45 },
    ];

    let completedFace = null;
    let allSolved = true;

    for (const face of faces) {
      const faceColors = currentColors.slice(face.start, face.start + 9);
      const firstColor = faceColors[0];

      const isFaceSolved = firstColor !== "#FFFFFF" && faceColors.every((c) => c === firstColor);

      if (isFaceSolved) {
        // If we haven't found a single completed face yet, mark this one
        if (!completedFace) completedFace = face.name;
      } else {
        // If any face is NOT solved, then the whole cube is not solved
        allSolved = false;
      }
    }

    if (allSolved) {
      setMessage("INCREDIBLE! You solved the WHOLE CUBE! 🌟🎉🏆");
      setShowReward(true);
    } else if (completedFace) {
      setMessage(`Yay! You completed the ${completedFace} face! Keep going!`);
    } else {
      setMessage(""); // Clear message if no win this turn
    }
  };

  const getColorCounts = () => {
    const counts = {};
    cubeState.forEach(color => {
      counts[color] = (counts[color] || 0) + 1;
    });
    return counts;
  };

  const colorCounts = getColorCounts();

  const handleFaceClick = (index) => {
    // Limit check: specific color should not exceed 9 (except White which is default/eraser)
    if (selectedColor !== "#FFFFFF") {
      const currentCount = colorCounts[selectedColor] || 0;
      if (currentCount >= 9) {
        setMessage(`You've already used 9 ${selectedColor === "#C41E3A" ? "Red" :
          selectedColor === "#009E60" ? "Green" :
            selectedColor === "#0051BA" ? "Blue" :
              selectedColor === "#FFD500" ? "Yellow" :
                selectedColor === "#FF5800" ? "Orange" : "squares"}!`);
        return;
      }
    }

    const newColors = [...cubeState];
    newColors[index] = selectedColor;
    setCubeState(newColors);

    // Check for completion
    checkCompletion(newColors);
  };

  const handleReset = () => {
    setCubeState(Array(54).fill("#FFFFFF"));
    setMessage("Cube Reset! Start Painting.");
    setShowReward(false);
  };

  return (
    <div className="App" style={{ height: "100vh", display: 'flex', flexDirection: 'column' }}>

      {view === "home" ? (
        <>
          {showReward && <VideoReward onClose={() => setShowReward(false)} />}

          {/* 3D Canvas Area */}
          <div style={{ flex: 1, position: 'relative' }}>
            <Canvas dpr={[1, 2]} camera={{ position: [4, 4, 4] }}>
              <ambientLight intensity={0.7} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Cube cubeState={cubeState} onFaceClick={handleFaceClick} />
              <OrbitControls minDistance={3} maxDistance={10} enablePan={false} />
            </Canvas>

            <Interface
              onReset={handleReset}
              message={message}
              onCheck={() => setView("game")}
            />
          </div>

          {/* Palette Area */}
          <div style={{ background: '#333', paddingBottom: '20px' }}>
            <Palette
              selectedColor={selectedColor}
              onSelectColor={setSelectedColor}
              colorCounts={colorCounts}
            />
          </div>
        </>
      ) : (
        <MathGame onBack={() => setView("home")} />
      )}

    </div>
  );
}
