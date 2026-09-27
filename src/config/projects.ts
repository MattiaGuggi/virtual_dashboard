import { ProjectConfigType } from "@/lib/types";

export const projects: ProjectConfigType[] = [
    {
        id: 'polls',
        name: 'Polls App',
        localPath: 'C:\\Users\\Utente\\Desktop\\next\\polls',
        startCommand: 'npm run dev',
        port: 3001,
        productionUrl: '',
        themeColor: '#10b981'
    },
    {
        id: 'closet',
        name: 'Closet App',
        localPath: 'C:\\Users\\Utente\\Desktop\\next\\closet',
        startCommand: 'npm run dev',
        port: 3002,
        productionUrl: '',
        themeColor: '#10b981'
    },
    {
        id: 'spotify',
        name: 'Spotify Dashboard',
        localPath: 'C:\\Users\\Utente\\Desktop\\next\\spotify_dashboard',
        startCommand: 'npm run dev',
        port: 3003,
        productionUrl: '',
        themeColor: '#10b981'
    },
    {
        id: 'karate',
        name: 'Karate App',
        localPath: 'C:\\Users\\Utente\\Desktop\\next\\karate',
        startCommand: 'npm run dev',
        port: 3004,
        productionUrl: '',
        themeColor: '#10b981'
    },
    {
        id: 'bar',
        name: 'Bar Service',
        localPath: 'C:\\Users\\Utente\\Desktop\\next\\bar_service',
        startCommand: 'npm run dev',
        port: 3005,
        productionUrl: '',
        themeColor: '#10b981'
    }
];