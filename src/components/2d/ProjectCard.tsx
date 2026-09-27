'use client';

import { useState } from 'react';
import { ProjectConfigType } from '@/lib/types';
import { useAppStore } from '@/lib/store';
import { Play, Square, ExternalLink, Loader2 } from 'lucide-react';

const ProjectCard = ({ project }: { project: ProjectConfigType }) => {
    // Attingiamo allo store globale che sarà condiviso con il 3D
    const { statuses, setStatus } = useAppStore();
    const status = statuses[project.id] || 'offline';
    
    const [isLoading, setIsLoading] = useState(false);

    const handleStart = async () => {
        setIsLoading(true);
        setStatus(project.id, 'booting');
        
        try {
            const res = await fetch('/api/process/start', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: project.id }),
            });
            
            const data = await res.json();
            
            if (res.ok) {
                setStatus(project.id, 'online');
            } else {
                console.error(data.error);
                setStatus(project.id, 'offline');
            }
        } catch (error) {
            console.error('Failed to start process:', error);
            setStatus(project.id, 'offline');
        } finally {
            setIsLoading(false);
        }
    };

    const handleStop = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/process/stop', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: project.id }),
            });
            
            if (res.ok) {
                setStatus(project.id, 'offline');
            }
        } catch (error) {
            console.error('Failed to stop process:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const openApp = () => {
        window.open(`http://localhost:${project.port}`, '_blank');
    };

    // Colori dinamici basati sullo stato
    const statusColors = {
        offline: 'bg-zinc-800 text-zinc-400',
        booting: 'bg-yellow-500/20 text-yellow-500 animate-pulse',
        online: 'bg-emerald-500/20 text-emerald-500',
    };

    return (
        <div 
            className="flex flex-col p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm transition-all hover:border-zinc-700"
            style={{ borderTop: `4px solid ${project.themeColor}` }}
        >
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{project.name}</h3>
                    <p className="text-xs text-zinc-500 font-mono">{project.localPath}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}>
                    {status.toUpperCase()}
                </div>
            </div>

            <div className="mt-auto pt-6 flex gap-3">
                {status === 'offline' ? (
                <button
                    onClick={handleStart}
                    disabled={isLoading}
                    className="flex-1 flex cursor-pointer items-center justify-center gap-2 bg-white text-black py-2 rounded-lg font-medium hover:bg-zinc-200 transition-colors disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
                    Avvia
                </button>
                ) : (
                <button
                    onClick={handleStop}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Square className="w-4 h-4" />}
                    Ferma
                </button>
                )}

                <button
                    onClick={openApp}
                    disabled={status !== 'online'}
                    className={`flex items-center justify-center p-2 rounded-lg transition-colors border ${
                        status === 'online' 
                        ? 'border-zinc-700 bg-zinc-800 text-white hover:bg-zinc-700' 
                        : 'border-zinc-800/50 bg-transparent text-zinc-600 cursor-not-allowed'
                    }`}
                    title="Apri nel browser"
                >
                    <ExternalLink className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;