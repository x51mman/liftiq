export type AuthStatus =
    | "unknown"
    | "loading"
    | "authenticated"
    | "unauthenticated";

export interface UserSession {
    id: string;
    username: string;
    displayName: string;
    role: string;
}