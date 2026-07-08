import type { PanelId } from "../model";

import type { PanelDefinition } from "./panel.types";

import { panelComponents } from "./panel.components";
import { Activity, LayersMinus, LayersPlus, LayoutDashboard } from "lucide-react";

export const panelDefinitions:
    Record<
        PanelId,
        PanelDefinition
    > = {

    "dashboard-main": {

        id:
            "dashboard-main",

        workspaceId:
            "dashboard",

        title:
            "Dashboard",

        icon: LayoutDashboard,

        component:
            panelComponents[
            "dashboard-main"
            ],

        defaultState:
            "open",

        closable:
            false,

        pinnable:
            true,

        permission:
            "dashboard:view",
    },

    "monitoring-main": {

        id:
            "monitoring-main",

        workspaceId:
            "monitoring",

        title:
            "Monitoring",

        icon: Activity,

        component:
            panelComponents[
            "monitoring-main"
            ],

        defaultState:
            "hidden",

        closable:
            true,

        pinnable:
            true,

        permission:
            "monitoring:view",
    },

    "service-main": {

        id: "service-main",

        workspaceId: "service",

        title: "Service",

        icon: LayersMinus,

        component:
            panelComponents["service-main"],

        defaultState: "hidden",

        closable: true,

        pinnable: true,

        permission: "service:view",
    },

    "analytics-main": {

        id: "analytics-main",

        workspaceId: "analytics",

        title: "Analytics",

        icon: LayersPlus,

        component:
            panelComponents["analytics-main"],

        defaultState: "hidden",

        closable: true,

        pinnable: true,

        permission: "analytics:view",
    },

};