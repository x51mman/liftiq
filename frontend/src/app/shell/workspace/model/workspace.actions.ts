import type {
    PersistedWorkspaceState,
} from "./workspace.persistence.types";

import {
    useWorkspaceStore,
} from "../store";

export function restoreWorkspace(
    persisted:
        PersistedWorkspaceState,
) {
    useWorkspaceStore.setState({
        activeWorkspaceId:
            persisted.activeWorkspaceId,

        activePanelId:
            persisted.activePanelId,

        panels:
            persisted.panels,

        layoutRoot:
            persisted.layoutRoot,
    });
}