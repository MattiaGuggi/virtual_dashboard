import { NextResponse } from 'next/server';
import { spawn } from 'child_process';
import { projects } from '@/config/projects';
import { runningProcesses } from '@/lib/process-manager';
import fs from 'fs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    const project = projects.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json({ error: 'Progetto non trovato' }, { status: 404 });
    }

    if (runningProcesses.has(id)) {
      return NextResponse.json({ message: 'Processo già in esecuzione', pid: runningProcesses.get(id)?.pid });
    }

    if (!fs.existsSync(project.localPath)) {
      console.error(`[ERRORE FATALE] La cartella non esiste: ${project.localPath}`);
      return NextResponse.json({ 
        error: `Cartella non trovata. Controlla il percorso: ${project.localPath}` 
      }, { status: 400 });
    }

    const [cmd, ...args] = project.startCommand.split(' ');
    const isWindows = process.platform === 'win32';
    const command = (isWindows && cmd === 'npm') ? 'npm.cmd' : cmd;

    // Creiamo un nuovo oggetto env che include tutte le variabili di sistema (process.env) più la porta specifica (project.port)
    const customEnv = {
      ...process.env,
      PORT: project.port.toString() // Questo forzerà Next.js a usare es. la 3001
    };

    // Ora che i percorsi sono corretti, possiamo lanciare il comando in modo pulito
    const child = spawn(command, args, {
      cwd: project.localPath,
      env: customEnv,
      shell: true, 
    });

    child.on('error', (err) => {
      console.error(`[${project.name}] Errore di sistema durante l'avvio:`, err);
      runningProcesses.delete(id);
    });

    runningProcesses.set(id, child);

    child.stdout?.on('data', (data) => {
      const output = data.toString().trim();
      if (output) console.log(`[${project.name}]: ${output}`);
    });
    
    child.stderr?.on('data', (data) => {
      const output = data.toString().trim();
      if (output) console.error(`[${project.name} ERROR]: ${output}`);
    });

    child.on('close', (code) => {
      console.log(`[${project.name}] chiuso con codice ${code}`);
      runningProcesses.delete(id);
    });

    return NextResponse.json({ success: true, pid: child.pid });
    
  } catch (error: any) {
    console.error("ERRORE DI SISTEMA NELL'API START:", error);
    return NextResponse.json({ error: error.message || 'Errore interno del server' }, { status: 500 });
  }
}