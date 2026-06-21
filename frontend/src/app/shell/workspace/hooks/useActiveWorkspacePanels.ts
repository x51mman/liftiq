import { useWorkspaceStore } from "../store";

export function useActiveWorkspacePanels() {
    return useWorkspaceStore((state) =>
        state.panels.filter(
            (panel) =>
                panel.workspaceId ===
                state.activeWorkspaceId &&
                panel.visible,
        ),
    );
}