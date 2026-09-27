import { ChildProcess } from 'child_process';

// Estendiamo l'oggetto globale per evitare che Next.js lo resetti al ricaricamento
const globalAny: any = global;

if (!globalAny.runningProcesses) {
  globalAny.runningProcesses = new Map<string, ChildProcess>();
}

export const runningProcesses: Map<string, ChildProcess> = globalAny.runningProcesses;