import { Suspense, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, useGLTF, Environment, useHelper } from '@react-three/drei'
import * as THREE from 'three'

// Main Room Component with Canvas
const RoomScene = ({ 
  roomSize = { width: 15, length: 20, height: 10 },
  wallColor = '#F5F5F5',
  floorColor = '#8B4513',
  furniture = [],
  onSelectFurniture = () => {},
  editable = true
}) => {
  return (
    <div className="w-full h-[500px] lg:h-[700px] rounded-lg overflow-hidden">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 5, 15]} />
          <Environment preset="apartment" />
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024}
          />
          <Room 
            width={roomSize.width} 
            length={roomSize.length} 
            height={roomSize.height} 
            wallColor={wallColor} 
            floorColor={floorColor} 
          />
          <FurnitureItems 
            items={furniture} 
            onSelect={onSelectFurniture} 
            editable={editable}
          />
          <OrbitControls 
            enableZoom={true} 
            enablePan={true} 
            enableRotate={true} 
            minDistance={1} 
            maxDistance={30}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Room Walls and Floor
const Room = ({ width, length, height, wallColor, floorColor }) => {
  const roomRef = useRef()
  
  return (
    <group ref={roomRef}>
      {/* Floor */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]} 
        receiveShadow
      >
        <planeGeometry args={[width, length]} />
        <meshStandardMaterial color={floorColor} />
      </mesh>
      
      {/* Back Wall */}
      <mesh 
        position={[0, height / 2, -length / 2]} 
        receiveShadow
      >
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Left Wall */}
      <mesh 
        position={[-width / 2, height / 2, 0]} 
        rotation={[0, Math.PI / 2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>
      
      {/* Right Wall */}
      <mesh 
        position={[width / 2, height / 2, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
        receiveShadow
      >
        <planeGeometry args={[length, height]} />
        <meshStandardMaterial color={wallColor} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// Furniture Items in the Room
const FurnitureItems = ({ items, onSelect, editable }) => {
  return (
    <group>
      {items.map((item, index) => (
        <FurnitureItem 
          key={index}
          item={item}
          onClick={() => onSelect(index)}
          editable={editable}
        />
      ))}
    </group>
  )
}

// Individual Furniture Item
const FurnitureItem = ({ item, onClick, editable }) => {
  const [hovered, setHovered] = useState(false)
  const modelPath = `/src/3D/${item.id}.glb`
  const { scene } = useGLTF(modelPath)
  
  return (
    <primitive
      object={scene.clone()}
      position={[
        item.position?.x || 0, 
        item.position?.y || 0.5, 
        item.position?.z || 0
      ]}
      rotation={[0, item.rotation || 0, 0]}
      scale={[item.scale || 1, item.scale || 1, item.scale || 1]}
      onClick={onClick}
      onPointerOver={() => editable && setHovered(true)}
      onPointerOut={() => editable && setHovered(false)}
      castShadow
      receiveShadow
    >
      {hovered && (
        <meshStandardMaterial 
          attach="material" 
          color="#FFD700" 
          opacity={0.8} 
          transparent
        />
      )}
    </primitive>
  )
}

export default RoomScene