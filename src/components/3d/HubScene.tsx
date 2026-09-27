'use client';

import { Environment, Grid, PointerLockControls } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { projects } from '@/config/projects';
import Portal from './Portal';
import Player from './Player';
import ExitTotem from './ExitTotem';

const HubScene = () => {
    return (
        <>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Environment preset="city" />
            <PointerLockControls makeDefault selector="#canvas-container" />

            <Physics>
                <Player />

                <RigidBody type="fixed">
                    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                        <planeGeometry args={[100, 100]} />
                        <meshBasicMaterial visible={false} />
                    </mesh>
                    <Grid infiniteGrid fadeDistance={40} sectionColor="#444" cellColor="#222" />
                </RigidBody>

                {projects.map((project, index) => {
                    const radius = 8;
                    const angle = (index / (projects.length - 1)) * Math.PI - Math.PI / 2; 
                    const x = Math.sin(angle) * radius;
                    const z = -Math.cos(angle) * radius;
                    
                    // NUOVO: Calcoliamo la rotazione Y in modo che il portale guardi verso l'origine (0,0,0)
                    const rotationY = Math.atan2(x, z) + Math.PI;

                    return (
                        <Portal 
                        key={project.id} 
                        project={project} 
                        position={[x, 0, z]} 
                        rotation={[0, rotationY, 0]} // Passiamo la rotazione!
                        />
                    );
                })}

                <ExitTotem position={[0, 0, 8]} />
            </Physics>
        </>
    );
}

export default HubScene;