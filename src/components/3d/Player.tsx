'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import { RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import { useAppStore } from '@/lib/store';
import * as THREE from 'three';

const SPEED = 5;
const JUMP_FORCE = 6;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

const Player = () => {
    const ref = useRef<RapierRigidBody>(null);
    const [, get] = useKeyboardControls();

    useFrame((state) => {
        if (!ref.current) return;

        // 1. GESTIONE DEL TELETRASPORTO AL CENTRO DELLA STANZA
        if (useAppStore.getState().shouldTeleportToOrigin) {
            ref.current.setTranslation({ x: 0, y: 3, z: 0 }, true);
            ref.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
            useAppStore.getState().setShouldTeleportToOrigin(false);
            return;
        }

        const translation = ref.current.translation();
        state.camera.position.set(translation.x, translation.y + 0.8, translation.z);

        // 2. BLOCCO MOVIMENTI DURANTE IL CARICAMENTO DEL PORTALE
        if (useAppStore.getState().isTransitioning) {
            const velocity = ref.current.linvel();
            ref.current.setLinvel({ x: 0, y: velocity.y, z: 0 }, true);
            return;
        }

        // 3. NORMALE MOVIMENTO WASD
        const { forward, backward, left, right, jump } = get();
        const velocity = ref.current.linvel();
        
        frontVector.set(0, 0, Number(backward) - Number(forward));
        sideVector.set(Number(left) - Number(right), 0, 0);

        direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(state.camera.rotation);

        ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z }, true);

        if (jump && Math.abs(velocity.y) < 0.1) {
            ref.current.setLinvel({ x: velocity.x, y: JUMP_FORCE, z: velocity.z }, true);
        }
    });

    return (
        <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 3, 0]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[0.5, 0.5]} />
        </RigidBody>
    );
}

export default Player;