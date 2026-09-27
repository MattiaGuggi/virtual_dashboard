import Link from 'next/link';
import { projects } from '@/config/projects';
import ProjectCard from '@/components/2d/ProjectCard';

const Dashboard2D = () => {
    return (
        <main className="min-h-screen bg-zinc-950 text-white p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row md:justify-between md:items-center mb-12 gap-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight mb-2">2D Hub</h1>
                    <p className="text-zinc-400">Gestisci i tuoi ambienti di sviluppo locali.</p>
                </div>
                <Link 
                    href="/" 
                    className="px-4 py-2 text-sm text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-white hover:bg-zinc-800 transition-all"
                >
                    ← Torna al Menu
                </Link>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Dashboard2D;
