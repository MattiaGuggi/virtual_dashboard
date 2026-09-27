import Link from 'next/link';

const Home =() => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6">
      <div className="max-w-2xl text-center space-y-8">
        <h1 className="text-5xl font-bold tracking-tight">Virtual Hub Manager</h1>
        <p className="text-zinc-400 text-lg">
          Initialize, manage, and enter your local development environments.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
          <Link 
            href="/2d" 
            className="w-64 p-6 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl transition-all flex flex-col items-center gap-3"
          >
            <span className="text-3xl">🎛️</span>
            <span className="text-xl font-semibold">2D Dashboard</span>
            <span className="text-sm text-zinc-500">Quick terminal control</span>
          </Link>
          
          <Link 
            href="/3d" 
            className="w-64 p-6 bg-blue-950 hover:bg-blue-900 border border-blue-800 rounded-xl transition-all shadow-[0_0_30px_-5px_rgba(37,99,235,0.3)] flex flex-col items-center gap-3"
          >
            <span className="text-3xl">🕹️</span>
            <span className="text-xl font-semibold text-blue-100">3D Arcade Hub</span>
            <span className="text-sm text-blue-300/60">Spatial web interaction</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Home;
