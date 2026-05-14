import { Float, OrbitControls, Stars, Text } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function Propeller({ position }) {
  const ref = useRef();

  useFrame((_, delta) => {
    ref.current.rotation.y += delta * 28;
  });

  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={[0.08, 0.08, 0.06, 24]} />
        <meshStandardMaterial color="#7dd3fc" emissive="#0ea5e9" emissiveIntensity={0.6} />
      </mesh>
      <mesh ref={ref} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.92, 0.035, 0.018]} />
        <meshStandardMaterial color="#bbf7d0" emissive="#22c55e" emissiveIntensity={1.2} transparent opacity={0.82} />
      </mesh>
    </group>
  );
}

function DroneModel() {
  const group = useRef();

  useFrame(({ clock }) => {
    group.current.rotation.y = Math.sin(clock.elapsedTime * 0.38) * 0.35;
    group.current.position.y = Math.sin(clock.elapsedTime * 1.4) * 0.12;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.35} floatIntensity={0.45}>
      <group ref={group}>
        <mesh castShadow>
          <boxGeometry args={[1.6, 0.26, 0.78]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} roughness={0.22} />
        </mesh>
        <mesh position={[0, 0.18, 0]}>
          <boxGeometry args={[0.82, 0.2, 0.48]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.18} emissive="#052e16" emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0, -0.22, 0.42]}>
          <sphereGeometry args={[0.18, 32, 16]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0284c7" emissiveIntensity={1.1} transparent opacity={0.82} />
        </mesh>
        {[
          [-1.08, 0.02, 0.72],
          [1.08, 0.02, 0.72],
          [-1.08, 0.02, -0.72],
          [1.08, 0.02, -0.72],
        ].map((pos) => (
          <group key={pos.join('-')}>
            <mesh position={[pos[0] / 2, 0, pos[2] / 2]} rotation={[0, Math.atan2(pos[2], pos[0]), 0]}>
              <boxGeometry args={[1.1, 0.055, 0.055]} />
              <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.2} />
            </mesh>
            <Propeller position={pos} />
          </group>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.75, 0.008, 8, 96]} />
          <meshBasicMaterial color="#22c55e" transparent opacity={0.52} />
        </mesh>
        <Text position={[0, 0.72, 0]} fontSize={0.16} color="#bbf7d0" anchorX="center">
          ROTEXAI DRONE
        </Text>
      </group>
    </Float>
  );
}

export default function DroneScene({ compact = false }) {
  return (
    <Canvas camera={{ position: compact ? [0, 2.4, 4.6] : [0, 2.8, 5.2], fov: 48 }} shadows dpr={[1, 1.6]}>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 5, 12]} />
      <ambientLight intensity={0.85} />
      <spotLight position={[3, 5, 4]} intensity={7} angle={0.42} penumbra={0.75} castShadow color="#7dd3fc" />
      <pointLight position={[-3, 2, -2]} intensity={3} color="#22c55e" />
      <Stars radius={60} depth={30} count={compact ? 550 : 900} factor={2.4} saturation={0} fade speed={0.8} />
      <DroneModel />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow>
        <circleGeometry args={[2.4, 96]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.07} side={THREE.DoubleSide} />
      </mesh>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} maxPolarAngle={Math.PI / 1.7} minPolarAngle={Math.PI / 3.2} />
    </Canvas>
  );
}
