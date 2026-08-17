import type { ComponentType } from "react";

import { DashboardScreen } from "@/features/dashboard";
import { UsersScreen } from "@/features/users";
import { ElevatorsScreen } from "@/features/elevators";
import { AuditScreen } from "@/features/audit";
import { ServiceScreen } from "@/features/service";
import { SettingsScreen } from "@/features/settings";
import { MonitoringScreen } from "@/features/monitoring";

import type { PanelId } from "../model/workspace.types";


export const panelComponents: Record<
    PanelId,
    ComponentType
> = {
    "dashboard-main": DashboardScreen,
    "users-main": UsersScreen,
    "elevators-main": ElevatorsScreen,
    "audit-main": AuditScreen,
    "service-main": ServiceScreen,
    "settings-main": SettingsScreen,
    "monitoring-main": MonitoringScreen,
};