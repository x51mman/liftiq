import { create } from "zustand";
import type { AuthStatus, UserSession } from "./auth.types";

interface AuthStore {

    status: AuthStatus;
    session: UserSession | null;

    setStatus(status: AuthStatus): void;

    setSession(session: UserSession | null): void;

    login(session: UserSession): void;
    logout(): void;
    reset(): void;

}

export const useAuthStore = create<AuthStore>((set) => ({

    status: "unknown",
    session: null,

    setStatus: (status) =>
        set({ status }),

    setSession: (session) =>
        set({ session }),

    login: (session) =>
        set({
            status: "authenticated",
            session
        }),

    logout: () =>
        set({
            status: "unauthenticated",
            session: null
        }),

    reset: () =>
        set({
            status: "unauthenticated",
            session: null,
        }),

}));