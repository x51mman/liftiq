import type { ComponentType } from "react";
import { DashboardScreen } from "@/features/dashboard";
import { MonitoringScreen } from "@/features/monitoring";
import type { PanelId } from "../model/workspace.types";

export const panelRegistry:
    Partial<Record<PanelId, ComponentType>> = {
    "dashboard-main": DashboardScreen,
    "monitoring-main": MonitoringScreen,
};