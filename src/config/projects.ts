import { ProjectConfigType } from "@/lib/types";

export const projects: ProjectConfigType[] = [
    {
        id: 'portfolio',
        name: 'Portfolio',
        localPath: '/path/to/your/portfolio',
        startCommand: 'npm run dev',
        port: 3001,
        productionUrl: '',
        themeColor: '#3b82f6'
    },
    {
        id: 'polls',
        name: 'Polls App',
        localPath: '/path/to/your/ecommerce',
        startCommand: 'npm run dev',
        port: 3002,
        productionUrl: '',
        themeColor: '#10b981'
    },
    {
        id: 'closet',
        name: 'Closet App',
        localPath: '/path/to/your/ecommerce',
        startCommand: 'npm run dev',
        port: 3003,
        productionUrl: '',
        themeColor: '#10b981'
    },
    {
        id: 'spotify',
        name: 'Spotify Dashboard',
        localPath: '/path/to/your/ecommerce',
        startCommand: 'npm run dev',
        port: 3004,
        productionUrl: '',
        themeColor: '#10b981'
    },
    {
        id: 'karate',
        name: 'Karate App',
        localPath: '/path/to/your/ecommerce',
        startCommand: 'npm run dev',
        port: 3005,
        productionUrl: '',
        themeColor: '#10b981'
    },
    {
        id: 'bar',
        name: 'Bar Service',
        localPath: '/path/to/your/ecommerce',
        startCommand: 'npm run dev',
        port: 3006,
        productionUrl: '',
        themeColor: '#10b981'
    }
];