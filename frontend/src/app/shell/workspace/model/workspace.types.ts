import type { WorkspaceLayout } from "./workspace-layout.types";
import type { DockPreviewState } from "./docking-preview.types";
import type { PanelDragState } from "./panel-drag.types";

export type WorkspaceId =
    | "dashboard"
    | "monitoring"
    | "service"
    | "analytics";

export type PanelId =
    | "dashboard-main"
    | "monitoring-main"
    | "service-main"
    | "analytics-main";

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