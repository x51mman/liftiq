import type { NavigationItem } from "../model";
import { routes } from "@/app/config";

export const navigationItems: NavigationItem[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        path: routes.dashboard,
    },
    {
        id: "users",
        label: "Users",
        path: routes.users,
    },
    {
        id: "elevators",
        label: "Elevators",
        path: routes.elevators,
    },
    {
        id: "audit",
        label: "Audit",
        path: routes.audit,
    },
    {
        id: "service",
        label: "Service",
        path: routes.service,
    },
    {
        id: "settings",
        label: "Settings",
        path: routes.settings,
    },
];