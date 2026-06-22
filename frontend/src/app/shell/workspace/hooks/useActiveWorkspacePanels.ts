import { useWorkspaceStore } from "../store";

export function useActiveWorkspacePanels() {

    const activeWorkspaceId =
        useWorkspaceStore(
            (state) => state.activeWorkspaceId,
        );

    const panels =
        useWorkspaceStore(
            (state) => state.panels,
        );

    return panels.filter(
        (panel) =>
            panel.workspaceId === activeWorkspaceId &&
            panel.visible,
    );
}