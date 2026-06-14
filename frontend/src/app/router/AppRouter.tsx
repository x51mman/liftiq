import { ApplicationShell } from "@/app/shell";
import { LoginScreen } from "@/features/auth/ui";
import { PublicRoute } from "./guards";

export function AppRouter() {

    return (

        <ApplicationShell>

            <PublicRoute>

                <LoginScreen />

            </PublicRoute>

        </ApplicationShell>

    );
}