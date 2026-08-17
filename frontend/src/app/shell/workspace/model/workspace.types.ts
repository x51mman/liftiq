import type { WorkspaceLayout } from "./workspace-layout.types";
import type { DockPreviewState } from "./docking-preview.types";
import type { PanelDragState } from "./panel-drag.types";

export type WorkspaceId =
    | "dashboard"
    | "users"
    | "elevators"
    | "audit"
    | "service"
    | "settings"
    | "monitoring";

export type PanelId =
    | "dashboard-main"
    | "users-main"
    | "elevators-main"
    | "audit-main"
    | "service-main"
    | "settings-main"
    | "monitoring-main";

export interface WorkspaceDefinition {
    id: WorkspaceId;
    title: string;
    description?: string;
}

export interface WorkspaceState {
    activeWorkspaceId: WorkspaceId;
    activePanelId: PanelId | null;
    workspaces: WorkspaceDefinition[];
    panels: WorkspacePanel[];
    layout: WorkspaceLayout;
    dockPreview: DockPreviewState | null;
    draggingPanel: PanelDragState | null;
}

export type PanelState =
    | "open"
    | "hidden"
    | "floating"
    | "minimized"
    | "visible"
    | "closed";

export interface WorkspacePanel {
    id: PanelId;
    workspaceId: WorkspaceId;
    title: string;
    state: PanelState;
}

export type WorkspaceRestorePayload = {
    activeWorkspaceId: WorkspaceId;
    activePanelId: PanelId | null;
} & (
        | { panels: WorkspacePanel[]; layout: WorkspaceLayout; }
        | { panels?: never; layout?: never } // vagy egyik se
    );