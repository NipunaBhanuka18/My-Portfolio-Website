'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import * as THREE from 'three';
import styles from './Hero3D.module.css';

const ParticleNetwork = ({ count = 100 }) => {
  const pointsRef = useRef();
  const linesRef = useRef();
  const { mouse } = useThree();

  // Create particles
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = [];
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      });
    }
    return [pos, vel];
  }, [count]);

  const linesGeometry = useMemo(() => new THREE.BufferGeometry(), []);

  useFrame(() => {
    if (!pointsRef.current) return;
    
    const positionsArray = pointsRef.current.geometry.attributes.position.array;
    
    // Update particle positions
    for (let i = 0; i < count; i++) {
      positionsArray[i * 3] += velocities[i].x;
      positionsArray[i * 3 + 1] += velocities[i].y;
      positionsArray[i * 3 + 2] += velocities[i].z;

      // Bounce off boundaries
      if (Math.abs(positionsArray[i * 3]) > 10) velocities[i].x *= -1;
      if (Math.abs(positionsArray[i * 3 + 1]) > 10) velocities[i].y *= -1;
      if (Math.abs(positionsArray[i * 3 + 2]) > 10) velocities[i].z *= -1;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Draw lines between close particles
    const linePositions = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positionsArray[i * 3] - positionsArray[j * 3];
        const dy = positionsArray[i * 3 + 1] - positionsArray[j * 3 + 1];
        const dz = positionsArray[i * 3 + 2] - positionsArray[j * 3 + 2];
        const distSq = dx * dx + dy * dy + dz * dz;

        if (distSq < 15) { // Proximity threshold
          linePositions.push(
            positionsArray[i * 3], positionsArray[i * 3 + 1], positionsArray[i * 3 + 2],
            positionsArray[j * 3], positionsArray[j * 3 + 1], positionsArray[j * 3 + 2]
          );
        }
      }
    }

    linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    
    // Interact with mouse (slight rotation based on mouse)
    if (pointsRef.current && linesRef.current) {
      const targetRotationX = (mouse.y * Math.PI) / 10;
      const targetRotationY = (mouse.x * Math.PI) / 10;
      
      pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.05;
      linesRef.current.rotation.x = pointsRef.current.rotation.x;
      linesRef.current.rotation.y = pointsRef.current.rotation.y;
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} color="#00f0ff" transparent opacity={0.8} />
      </points>
      <lineSegments ref={linesRef} geometry={linesGeometry}>
        <lineBasicMaterial color="#0066cc" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
};

export default function Hero3D() {
  const [userName, setUserName] = React.useState('Explorer');

  React.useEffect(() => {
    // Client-side only
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    } else {
      localStorage.setItem('userName', 'Explorer');
    }

    const handleNameUpdate = (e) => {
      setUserName(e.detail);
    };

    window.addEventListener('userNameUpdated', handleNameUpdate);
    return () => window.removeEventListener('userNameUpdated', handleNameUpdate);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div className={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <ParticleNetwork count={150} />
          <Preload all />
        </Canvas>
      </div>
      <div className={styles.heroContent}>
        <p className={styles.greeting} style={{ color: 'var(--color-neon-accent)', fontSize: '1.2rem', marginBottom: '15px', fontWeight: 500 }}>
          Welcome, {userName}
        </p>
        <div style={{ fontSize: '1.8rem', color: 'var(--color-text-primary)', marginBottom: '5px', fontWeight: 600 }}>
          I'm Nipuna Bhanuka
        </div>
        <h1 className={styles.headline}>Architecting <br/><span className="neon-text">Intelligent Ecosystems.</span></h1>
        <p className={styles.subheadline}>Artificial Intelligence Undergraduate | Full-Stack</p>
      </div>
    </section>
  );
}
