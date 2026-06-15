import { ApplicationShell } from "@/app/shell";
import { LoginScreen } from "@/features/auth/ui";
import { DashboardScreen } from "@/features/dashboard";
import { useAuth } from "@/features/auth";
//import { PublicRoute } from "./guards";

export function AppRouter() {

    const { status } = useAuth();

    return (

        <ApplicationShell>

            {status === "authenticated" ? (

                <DashboardScreen />

            ) : (

                <LoginScreen />

            )}

        </ApplicationShell>

    );
}