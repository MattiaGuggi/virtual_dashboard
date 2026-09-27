import { Html } from '@react-three/drei';
import { ProjectConfigType } from '@/lib/types';

export default function Portal({ project, position }: { project: ProjectConfigType, position: [number, number, number] }) {
    const handleEnterPortal = async () => {
        // 1. Tell Next.js API to start the local server via child_process
        await fetch('/api/process/start', {
        method: 'POST',
        body: JSON.stringify({ id: project.id })
        });

        // 2. Open the ACTUAL web app in a new tab (breaking out of the 3D canvas)
        window.open(`http://localhost:${project.port}`, '_blank');
    };

    return (
        <mesh position={position} onClick={handleEnterPortal}>
            {/* A simple box acting as a door/arcade machine */}
            <boxGeometry args={[2, 3, 1]} />
            <meshStandardMaterial color={project.themeColor} />
            
            {/* Floating UI above the 3D object */}
            <Html position={[0, 2, 0]} center>
                <div className="bg-black/80 text-white p-2 rounded text-center">
                <h2>{project.name}</h2>
                <button 
                    className="text-sm bg-white text-black px-2 py-1 mt-1 rounded"
                    onClick={handleEnterPortal}
                >
                    Enter App
                </button>
                </div>
            </Html>
        </mesh>
    );
}