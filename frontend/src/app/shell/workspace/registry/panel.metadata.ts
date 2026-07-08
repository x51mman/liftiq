import {
    Activity,
    LayoutDashboard,
    Wrench,
    ChartColumn,
} from "lucide-react";

import type {
    PanelId,
} from "../model";

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

    "monitoring-main": {
        workspaceId: "monitoring",
        title: "Monitoring",
        icon: Activity,
        defaultState: "hidden",
        closable: true,
        pinnable: true,
        permission: "monitoring:view",
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

    "analytics-main": {
        workspaceId: "analytics",
        title: "Analytics",
        icon: ChartColumn,
        defaultState: "hidden",
        closable: true,
        pinnable: true,
        permission: "analytics:view",
    },
}