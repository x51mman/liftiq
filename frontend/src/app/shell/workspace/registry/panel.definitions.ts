import type { PanelId } from "../model/workspace.types";

import type { PanelDefinition } from "./panel.types";

import { panelComponents } from "./panel.components";
import { Activity, LayersMinus, LayoutDashboard } from "lucide-react";

export const panelDefinitions:
    Record<
        PanelId,
        PanelDefinition
    > = {

    "dashboard-main": {

        id: "dashboard-main",

        workspaceId: "dashboard",

        title: "Dashboard",

        icon: LayoutDashboard,

        component: panelComponents["dashboard-main"],

        defaultState: "open",

        closable: false,

        pinnable: true,

        permission: "dashboard:view",
    },

    "users-main": {

        id: "users-main",

        workspaceId: "users",

        title: "Users",

        icon: LayersMinus,

        component: panelComponents["users-main"],

        defaultState: "hidden",

        closable: true,

        pinnable: true,

        permission: "users:view",
    },

    "elevators-main": {

        id: "elevators-main",

        workspaceId: "elevators",

        title: "Elevators",

        icon: LayersMinus,

        component: panelComponents["elevators-main"],

        defaultState: "hidden",

        closable: true,

        pinnable: true,

        permission: "elevators:view",
    },

    "audit-main": {

        id: "audit-main",

        workspaceId: "audit",

        title: "Audit",

        icon: LayersMinus,

        component: panelComponents["audit-main"],

        defaultState: "hidden",

        closable: true,

        pinnable: true,

        permission: "audit:view",
    },

    "service-main": {

        id: "service-main",

        workspaceId: "service",

        title: "Service",

        icon: LayersMinus,

        component: panelComponents["service-main"],

        defaultState: "hidden",

        closable: true,

        pinnable: true,

        permission: "service:view",
    },

    "settings-main": {

        id: "settings-main",

        workspaceId: "settings",

        title: "Settings",

        icon: LayersMinus,

        component: panelComponents["settings-main"],

        defaultState: "hidden",

        closable: true,

        pinnable: true,

        permission: "settings:view",
    },

    "monitoring-main": {

        id: "monitoring-main",

        workspaceId: "monitoring",

        title: "Monitoring",

        icon: Activity,

        component: panelComponents["monitoring-main"],

        defaultState: "visible",

        closable: true,

        pinnable: true,

        permission: "monitoring:view",
    },

};