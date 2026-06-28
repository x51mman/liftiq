import type { PersistedWorkspaceState } from "./workspace.persistence.types";
import { useWorkspaceStore } from "../store";
import { defaultLayout } from "../model/default-layout";

export function restoreWorkspace(persisted: PersistedWorkspaceState) {
    if ('panels' in persisted) {
        // V2: van panels + layoutRoot
        useWorkspaceStore.setState({
            activeWorkspaceId: persisted.activeWorkspaceId,
            activePanelId: persisted.activePanelId,
            panels: persisted.panels,
            layoutRoot: persisted.layoutRoot, // LayoutNode, nem lehet null V2-ben
        });
    } else {
        // Legacy: nincs panels/layoutRoot
        useWorkspaceStore.setState({
            activeWorkspaceId: persisted.activeWorkspaceId,
            activePanelId: persisted.activePanelId,
            panels: [],
            layoutRoot: defaultLayout,
        });
    }
}