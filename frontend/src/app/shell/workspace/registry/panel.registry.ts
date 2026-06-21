import { DashboardScreen } from "@/features/dashboard";
import type { ComponentType } from "react";
import type { PanelId } from "../model/workspace.types";

export const panelRegistry:
    Partial<Record<PanelId, ComponentType>> = {
    "dashboard-main": DashboardScreen,
};