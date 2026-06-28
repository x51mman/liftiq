import { useWorkspaceStore } from "./workspace.store";

export function getWorkspaceSnapshot() {
    const state =
        useWorkspaceStore.getState();

    return {
        activeWorkspaceId: state.activeWorkspaceId,

        activePanelId: state.activePanelId,

        panels: state.panels,

        layoutRoot: state.layoutRoot,

    };
}