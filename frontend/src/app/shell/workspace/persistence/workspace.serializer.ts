import type {
    PersistedWorkspaceState,
} from "../model";

import {
    useWorkspaceStore,
} from "../store";

export function serializeWorkspace():
    PersistedWorkspaceState {

    const state =
        useWorkspaceStore.getState();

    return {
        activeWorkspaceId:
            state.activeWorkspaceId,
        activePanelId:
            state.activePanelId,
        panels:
            state.panels,
        layoutRoot:
            state.layoutRoot,
    };
}