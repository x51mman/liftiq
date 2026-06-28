import type { LayoutNode } from "./panel-layout.types";
import type {
    PanelId,
    WorkspaceId,
    WorkspacePanel,
} from "./workspace.types";

export type PersistedWorkspaceState = {
    activeWorkspaceId: WorkspaceId;
    activePanelId: PanelId | null;
} & (
        | { panels: WorkspacePanel[]; layoutRoot: LayoutNode | null }
        | { panels?: never; layoutRoot?: never }
    );