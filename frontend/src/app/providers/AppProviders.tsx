import type { ReactNode } from "react";
import { ThemeProvider } from "@/shared/theme";
import { QueryProvider } from "./query-provider";
import { AuthProvider } from "./auth-provider";

type Props = {
    children: ReactNode;
};

export function AppProviders({
    children,
}: Props) {
    return (
        <ThemeProvider>
            <QueryProvider>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </QueryProvider>
        </ThemeProvider>
    );
}