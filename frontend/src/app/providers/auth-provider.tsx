import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export function AuthProvider({
    children,
}: Props) {
    return <>{children}</>;
}

/*
auth bootstrap
refresh timer
idle timeout
websocket auth sync
permission cache
*/