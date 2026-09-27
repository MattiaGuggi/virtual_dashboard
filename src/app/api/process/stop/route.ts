import { NextResponse } from 'next/server';
import { runningProcesses } from '@/lib/process-manager';
import { spawn } from 'child_process';

export async function POST(req: Request) {
  try {
    const { id } = await req.json();
    const child = runningProcesses.get(id);

    if (!child) {
      return NextResponse.json({ message: 'Nessun processo attivo trovato per questo ID' }, { status: 404 });
    }

    const isWindows = process.platform === 'win32';

    return new Promise((resolve) => {
      if (isWindows && child.pid) {
        // SU WINDOWS: Usiamo taskkill /PID [numero] /T (uccide tutto l'albero) /F (force)
        const killer = spawn('taskkill', ['/pid', child.pid.toString(), '/f', '/t']);
        
        killer.on('close', () => {
          runningProcesses.delete(id);
          resolve(NextResponse.json({ success: true, message: 'Processo terminato (Windows)' }));
        });
        
        killer.on('error', (err) => {
          console.error(`Errore durante taskkill su ${id}:`, err);
          // Fallback di sicurezza
          child.kill('SIGINT');
          runningProcesses.delete(id);
          resolve(NextResponse.json({ error: 'Errore nel kill system' }, { status: 500 }));
        });
      } else {
        // SU MAC/LINUX: Il kill standard generalmente è sufficiente, 
        // oppure potremmo dover implementare 'kill -9 -[PID]' per i processi di gruppo
        child.kill('SIGINT');
        runningProcesses.delete(id);
        resolve(NextResponse.json({ success: true, message: 'Processo terminato (Unix)' }));
      }
    });

  } catch (error) {
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 });
  }
}