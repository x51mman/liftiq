import { useWorkspaceStore } from "../store";

export function useActivePanel() {
    return useWorkspaceStore(
        (state) => state.activePanelId,
    );
}