import type { LayoutNode }
    from "./panel-layout.types";

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
    layoutRoot: LayoutNode | null;
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
        | { panels: WorkspacePanel[]; layoutRoot?: LayoutNode }
        | { panels?: never; layoutRoot?: never } // vagy egyik se
    );