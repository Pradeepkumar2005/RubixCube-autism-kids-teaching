import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Palette from "./components/Palette";
import Cube from "./components/Cube";
import Interface from "./components/Interface";
import "./App.css";

export default function App() {
  // 54 stickers. Initial state: all white (blank canvas)
  const [cubeState, setCubeState] = useState(Array(54).fill("#FFFFFF"));
  const [selectedColor, setSelectedColor] = useState("#C41E3A"); // Default Red
  const [message, setMessage] = useState("Pick a color and paint the cube!");

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

    for (const face of faces) {
      const faceColors = currentColors.slice(face.start, face.start + 9);
      const firstColor = faceColors[0];
      // Check if all same and not white (assuming white is empty/default)
      if (firstColor !== "#FFFFFF" && faceColors.every((c) => c === firstColor)) {
        completedFace = face.name;
        break;
      }
    }

    if (completedFace) {
      setMessage(`Yay! You completed the ${completedFace} face! 🎉`);
    } else {
      setMessage(""); // Clear message if no win this turn, or keep it? 
      // Better to clear it so they don't see "Yay" if they break it.
      // But if they break it, we should probably check if *another* face is still full. 
      // Logic above finds the *first* completed face. 
    }
  };

  const handleFaceClick = (index) => {
    const newColors = [...cubeState];
    newColors[index] = selectedColor;
    setCubeState(newColors);

    // Check for completion
    checkCompletion(newColors);
  };

  const handleReset = () => {
    setCubeState(Array(54).fill("#FFFFFF"));
    setMessage("Cube Reset! Start Painting.");
  };

  return (
    <div className="App" style={{ height: "100vh", background: "#1a1a1a", display: 'flex', flexDirection: 'column' }}>

      {/* 3D Canvas Area */}
      <div style={{ flex: 1, position: 'relative' }}>
        <Canvas camera={{ position: [4, 4, 4] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Stars />

          <Cube cubeState={cubeState} onFaceClick={handleFaceClick} />

          <OrbitControls minDistance={3} maxDistance={10} />
        </Canvas>

        <Interface
          onReset={handleReset}
          message={message}
        />
      </div>

      {/* Palette Area */}
      <div style={{ background: '#333', paddingBottom: '20px' }}>
        <Palette selectedColor={selectedColor} onSelectColor={setSelectedColor} />
      </div>

    </div>
  );
}
