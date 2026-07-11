import type {
    PanelId,
    WorkspaceId,
    WorkspacePanel,
} from "./workspace.types";

import type {
    WorkspaceLayout,
} from "./workspace-layout.types";

type PersistedWorkspaceLegacy = {
    activeWorkspaceId: WorkspaceId;
    activePanelId: PanelId | null;
};

type PersistedWorkspaceV2 =
    PersistedWorkspaceLegacy & {
        panels: WorkspacePanel[];
        layout: WorkspaceLayout;
    };

export type PersistedWorkspaceState =
    | PersistedWorkspaceLegacy
    | PersistedWorkspaceV2;