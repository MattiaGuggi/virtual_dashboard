'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { ProjectConfigType } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import * as THREE from 'three';

interface PortalProps {
  project: ProjectConfigType;
  position: [number, number, number];
  rotation: [number, number, number];
}

const Portal = ({ project, position, rotation }: PortalProps) => {
    const { statuses, setStatus, setIsTransitioning, setTransitionText, setShouldTeleportToOrigin } = useAppStore();
    const status = statuses[project.id] || 'offline';
    
    const tunnelRef = useRef<THREE.Mesh>(null);
    const backWallRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        // Il tunnel gira. Gira velocissimo se sta caricando
        if (tunnelRef.current && status !== 'offline') {
            tunnelRef.current.rotation.y += delta * (status === 'booting' ? 3 : 0.5);
        }
        // Il muro in fondo pulsa
        if (backWallRef.current && status !== 'offline') {
            const pulse = status === 'booting' ? Math.sin(state.clock.elapsedTime * 10) * 0.2 + 0.8 : 1;
            backWallRef.current.scale.set(pulse, pulse, 1);
        }
    });

    const waitForServer = async (port: number) => {
        while (true) {
            try {
                await fetch(`http://localhost:${port}`, { mode: 'no-cors' });
                return;
            } catch (e) {
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    };

    const handleEnter = async () => {
        if (useAppStore.getState().isTransitioning) return;

        setIsTransitioning(true); // Gela il giocatore e mostra lo schermo nero

        if (status === 'offline') {
            setTransitionText(`BOOTING ${project.name.toUpperCase()}...`);
            setStatus(project.id, 'booting');
            await fetch('/api/process/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: project.id }),
            });
        } else {
            setTransitionText(`ENTERING ${project.name.toUpperCase()}...`);
        }

        // Aspetta in background
        await waitForServer(project.port);

        // Diamo l'illusione del successo
        setTransitionText("DIMENSION LINKED!");
        setStatus(project.id, 'online');
        window.open(`http://localhost:${project.port}`, '_blank');
        
        // Dissolvenza e teletrasporto del giocatore al centro dell'hub
        setTimeout(() => {
            setIsTransitioning(false);
            setTransitionText("");
            setShouldTeleportToOrigin(true); 
        }, 1500);
    };

    const color = status === 'offline' ? '#222' : (status === 'booting' ? '#eab308' : project.themeColor);

    return (
        <group position={position} rotation={rotation}>
            {/* TITOLI SOPRA L'INGRESSO */}
            <Text position={[0, 4, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
                {project.name}
            </Text>
            <Text position={[0, 3.5, 0]} fontSize={0.2} color={color} anchorX="center" anchorY="middle">
                {status === 'booting' ? 'COMPILING DIMENSION...' : status.toUpperCase()}
            </Text>

            {/* L'INGRESSO (L'anello solido) */}
            <RigidBody type="fixed" colliders="trimesh">
                <mesh position={[0, 1.5, 0]}>
                    <torusGeometry args={[1.5, 0.2, 16, 100]} />
                    <meshStandardMaterial color={status === 'offline' ? '#333' : color} metalness={0.8} roughness={0.2} />
                </mesh>
            </RigidBody>

            {/* IL TUNNEL DIMENSIONALE (Lungo 5 metri) */}
            <RigidBody type="fixed" colliders="trimesh">
                <mesh ref={tunnelRef} position={[0, 1.5, -2.5]} rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[1.5, 1.5, 5, 16, 1, true]} />
                    <meshStandardMaterial 
                        color={color} 
                        emissive={color} 
                        emissiveIntensity={status === 'booting' ? 2 : 0.5} 
                        wireframe={status !== 'offline'} 
                        side={THREE.DoubleSide} 
                        transparent
                        opacity={status === 'offline' ? 0.1 : 0.8}
                    />
                </mesh>
            </RigidBody>

            {/* IL FONDO DEL TUNNEL (Il vero innesco del teletrasporto) */}
            <RigidBody type="fixed" colliders="hull" sensor onIntersectionEnter={handleEnter}>
                <mesh ref={backWallRef} position={[0, 1.5, -4.9]}>
                    <circleGeometry args={[1.5, 32]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={status === 'offline' ? 0 : 2} />
                </mesh>
            </RigidBody>
        
        </group>
    );
}

export default Portal;