import { create } from 'zustand';

type AppStatus = 'offline' | 'booting' | 'online';

interface AppState {
    statuses: Record<string, AppStatus>;
    setStatus: (id: string, status: AppStatus) => void;
    // Per l'effetto di transizione e teletrasporto
    isTransitioning: boolean;
    setIsTransitioning: (val: boolean) => void;
    transitionText: string;
    setTransitionText: (val: string) => void;
    shouldTeleportToOrigin: boolean;
    setShouldTeleportToOrigin: (val: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
    statuses: {},
    setStatus: (id, status) =>
        set((state) => ({ statuses: { ...state.statuses, [id]: status } })),
    isTransitioning: false,
    setIsTransitioning: (val) => set({ isTransitioning: val }),
    transitionText: '',
    setTransitionText: (val) => set({ transitionText: val }),
    shouldTeleportToOrigin: false,
    setShouldTeleportToOrigin: (val) => set({ shouldTeleportToOrigin: val }),
}));