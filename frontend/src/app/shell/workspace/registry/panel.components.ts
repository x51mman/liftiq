import type { ComponentType } from "react";

import { DashboardScreen } from "@/features/dashboard";
import { MonitoringScreen } from "@/features/monitoring";
import { ServiceScreen } from "@/features/service";
import { AnalyticsScreen } from "@/features/analytics";

import type { PanelId } from "../model";

export const panelComponents: Record<
    PanelId,
    ComponentType
> = {
    "dashboard-main":
        DashboardScreen,

    "monitoring-main":
        MonitoringScreen,

    "service-main":
        ServiceScreen,

    "analytics-main":
        AnalyticsScreen,
};