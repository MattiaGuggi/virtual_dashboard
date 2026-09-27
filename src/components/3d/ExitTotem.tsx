'use client';

import { Text } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useRouter } from 'next/navigation';

export default function ExitTotem({ position }: { position: [number, number, number] }) {
    const router = useRouter();

    return (
        <group position={position}>
            <Text position={[0, 2.5, 0]} fontSize={0.4} color="#ef4444" anchorX="center" anchorY="middle">
                EXIT TO 2D
            </Text>
            
            <RigidBody type="fixed" colliders="cuboid" sensor onIntersectionEnter={() => router.push('/2d')}>
                <mesh position={[0, 1, 0]}>
                    <octahedronGeometry args={[0.8]} />
                    <meshStandardMaterial color="#ef4444" wireframe />
                </mesh>
            </RigidBody>
        </group>
    );
}