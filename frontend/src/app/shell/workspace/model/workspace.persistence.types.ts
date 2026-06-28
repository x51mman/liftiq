import type { LayoutNode } from "./panel-layout.types";
import type {
    PanelId,
    WorkspaceId,
    WorkspacePanel,
} from "./workspace.types";

type PersistedWorkspaceLegacy = {
    activeWorkspaceId: WorkspaceId;
    activePanelId: PanelId | null;
};

type PersistedWorkspaceV2 =
    PersistedWorkspaceLegacy & {
        panels: WorkspacePanel[];
        layoutRoot: LayoutNode;
    };

export type PersistedWorkspaceState =
    | PersistedWorkspaceLegacy
    | PersistedWorkspaceV2;