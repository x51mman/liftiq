import type { ReactNode } from "react";

import { useAuth } from "@/features/auth";

interface Props {
    children: ReactNode;
}

export function PublicRoute({
    children,
}: Props) {

    const { status } =
        useAuth();

    if (
        status === "loading" ||
        status === "unknown"
    ) {
        return null;
    }

    if (
        status === "authenticated"
    ) {
        return null;
    }

    return <>{children}</>;
}