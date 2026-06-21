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

export interface WorkspacePanel {
    id: PanelId;
    workspaceId: WorkspaceId;
    title: string;
    visible: boolean;
}

export interface WorkspaceState {
    activeWorkspaceId: WorkspaceId;
    activePanelId: PanelId | null;
    workspaces: WorkspaceDefinition[];
    panels: WorkspacePanel[];
}