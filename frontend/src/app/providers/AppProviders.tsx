import type { ReactNode } from "react";

import { ThemeProvider } from "@/shared/theme";

import { QueryProvider } from "./query-provider";

type Props = {
    children: ReactNode;
};

export function AppProviders({
    children,
}: Props) {
    return (
        <ThemeProvider>
            <QueryProvider>
                {children}
            </QueryProvider>
        </ThemeProvider>
    );
}