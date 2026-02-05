import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Text } from "@react-three/drei";

// Geometry constants
const CUBE_SIZE = 1;
const SPACING = 0.05;
const TOTAL_SIZE = CUBE_SIZE + SPACING;

// Helper to generate the 54 facelets positions/rotations
// or easier: Generate 27 cubies, and determining which face is exposed.
// BUT for coloring, we specifically want to color the *sticker*.
// So let's render 27 black cubies background, and 54 colored "stickers" slightly offset.

const Sticker = ({ position, rotation, color, onClick }) => {
    return (
        <mesh position={position} rotation={rotation} onClick={onClick}>
            <boxGeometry args={[0.9, 0.9, 0.05]} />
            <meshStandardMaterial color={color || "#222"} roughness={0.5} />
        </mesh>
    );
};

export default function Cube({ cubeState, onFaceClick }) {
    const group = useRef();

    useFrame(() => {
        // defaults, can add auto-rotation idle later
    });

    // We need to map linear index (0-53) to 3D positions.
    // Order: Up, Down, Front, Back, Left, Right (standard order usually U,D,F,B,L,R)
    // Let's stick to: Front, Back, Up, Down, Right, Left for simplicity in iteration or defined explicitely.

    // Actually, creating 6 Faces is cleaner.

    return (
        <group ref={group}>
            {/* Core Black Cube to fill gaps */}
            <mesh>
                <boxGeometry args={[2.95, 2.95, 2.95]} />
                <meshStandardMaterial color="black" />
            </mesh>

            {/* Front Face (z = 1.5) - Indices 0-8 */}
            <Face
                startIndex={0}
                colors={cubeState}
                onFaceClick={onFaceClick}
                rotation={[0, 0, 0]}
                position={[0, 0, 1.5]}
            />

            {/* Back Face (z = -1.5) - Indices 9-17 */}
            <Face
                startIndex={9}
                colors={cubeState}
                onFaceClick={onFaceClick}
                rotation={[0, Math.PI, 0]}
                position={[0, 0, -1.5]}
            />

            {/* Top Face (y = 1.5) - Indices 18-26 */}
            <Face
                startIndex={18}
                colors={cubeState}
                onFaceClick={onFaceClick}
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, 1.5, 0]}
            />

            {/* Bottom Face (y = -1.5) - Indices 27-35 */}
            <Face
                startIndex={27}
                colors={cubeState}
                onFaceClick={onFaceClick}
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, -1.5, 0]}
            />

            {/* Right Face (x = 1.5) - Indices 36-44 */}
            <Face
                startIndex={36}
                colors={cubeState}
                onFaceClick={onFaceClick}
                rotation={[0, Math.PI / 2, 0]}
                position={[1.5, 0, 0]}
            />

            {/* Left Face (x = -1.5) - Indices 45-53 */}
            <Face
                startIndex={45}
                colors={cubeState}
                onFaceClick={onFaceClick}
                rotation={[0, -Math.PI / 2, 0]}
                position={[-1.5, 0, 0]}
            />

        </group>
    );
}

const Face = ({ startIndex, colors, onFaceClick, rotation, position }) => {
    // 3x3 grid centered at 0,0 locally
    const stickers = [];
    for (let i = 0; i < 9; i++) {
        const row = Math.floor(i / 3);
        const col = i % 3;
        // Map 0,1,2 -> -1, 0, 1
        const x = (col - 1) * 1.0;
        const y = -(row - 1) * 1.0; // Top to bottom

        stickers.push(
            <Sticker
                key={startIndex + i}
                position={[x, y, 0]} // Local to the face group
                rotation={[0, 0, 0]}
                color={colors[startIndex + i]}
                onClick={(e) => {
                    e.stopPropagation();
                    onFaceClick(startIndex + i);
                }}
            />
        )
    }

    return (
        <group rotation={rotation} position={position}>
            {stickers}
        </group>
    )
}
