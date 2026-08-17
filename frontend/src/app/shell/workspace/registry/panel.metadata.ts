import {
    Activity,
    LayoutDashboard,
    Wrench,
    ChartColumn,
    TrendingUp,
} from "lucide-react";

import type {
    PanelId,
} from "../model/workspace.types";

import type {
    PanelMetadata,
} from "./panel.types";

export const panelMetadata: Record<
    PanelId,
    PanelMetadata
> =
{
    "dashboard-main": {
        workspaceId: "dashboard",
        title: "Dashboard",
        icon: LayoutDashboard,
        defaultState: "open",
        closable: false,
        pinnable: true,
        permission: "dashboard:view",
    },

    "users-main": {
        workspaceId: "users",
        title: "Users",
        icon: ChartColumn,
        defaultState: "open",
        closable: true,
        pinnable: true,
        permission: "users:view",
    },

    "elevators-main": {
        workspaceId: "elevators",
        title: "Elevators",
        icon: TrendingUp,
        defaultState: "open",
        closable: true,
        pinnable: true,
        permission: "elevators:view",
    },

    "audit-main": {
        workspaceId: "audit",
        title: "Audit",
        icon: Wrench,
        defaultState: "open",
        closable: true,
        pinnable: true,
        permission: "audit:view",
    },

    "service-main": {
        workspaceId: "service",
        title: "Service",
        icon: Wrench,
        defaultState: "hidden",
        closable: true,
        pinnable: true,
        permission: "service:view",
    },

    "settings-main": {
        workspaceId: "settings",
        title: "Settings",
        icon: Wrench,
        defaultState: "hidden",
        closable: true,
        pinnable: true,
        permission: "settings:view",
    },

    "monitoring-main": {
        workspaceId: "monitoring",
        title: "Monitoring",
        icon: Activity,
        defaultState: "visible",
        closable: true,
        pinnable: true,
        permission: "monitoring:view",
    },
}