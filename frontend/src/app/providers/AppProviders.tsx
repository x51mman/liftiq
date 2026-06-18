import type { ReactNode } from "react";
import { ThemeProvider } from "@/shared/theme";
import { QueryProvider } from "./query-provider";
import { AuthProvider } from "./auth-provider";
import { RuntimeProvider } from "./runtime-provider";
import { RouterProvider } from "./router-provider";

type Props = {
    children: ReactNode;
};

export function AppProviders({
    children,
}: Props) {
    return (
        <ThemeProvider>
            <RouterProvider>
                <QueryProvider>
                    <AuthProvider>
                        <RuntimeProvider>
                            {children}
                        </RuntimeProvider>
                    </AuthProvider>
                </QueryProvider>
            </RouterProvider>
        </ThemeProvider>
    );
}