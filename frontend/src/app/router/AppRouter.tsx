import { ShellRoot } from "@/app/shell";
import { LoginScreen } from "@/features/auth/ui";
//import { DashboardScreen } from "@/features/dashboard";
//import { routes } from "../config";
//import { UsersScreen } from "@/features/users";
//import { AuditScreen } from "@/features/audit";
//import { ElevatorsScreen } from "@/features/elevators";
//import { SettingsScreen } from "@/features/settings";
//import { ServiceScreen } from "@/features/service";
//import { Routes, Route, Navigate, } from "react-router-dom";

import { useAuth } from "@/features/auth";
import { MainLayout } from "../shell/layouts";

export function AppRouter() {
    const { status } = useAuth();

    return (
        <ShellRoot>
            {status === "authenticated" ? (
                <MainLayout />
            ) : (
                <LoginScreen />
            )}
        </ShellRoot>
    );
}
/*
    return (

        <ApplicationShell>

            <Routes>

                <Route
                    path={routes.login}
                    element={<LoginScreen />}
                />

                <Route
                    path={routes.dashboard}
                    element={<DashboardScreen />}
                />

                <Route
                    path={routes.users}
                    element={<UsersScreen />}
                />

                <Route
                    path={routes.elevators}
                    element={<ElevatorsScreen />}
                />

                <Route
                    path={routes.audit}
                    element={<AuditScreen />}
                />

                <Route
                    path={routes.service}
                    element={<ServiceScreen />}
                />

                <Route
                    path={routes.settings}
                    element={<SettingsScreen />}
                />

                <Route
                    path="*"
                    element={
                        <Navigate
                            to={routes.dashboard}
                            replace
                        />
                    }
                />

            </Routes>

        </ApplicationShell>

    );
} */