import type { PersistedWorkspaceState } from "../model";
import { defaultLayout } from "../model/default-layout";
import type { WorkspaceRestorePayload } from "../model";

export function deserializeWorkspace(
    persisted: PersistedWorkspaceState
): WorkspaceRestorePayload {
    // Ha van panels, akkor layoutRoot is kell
    if (persisted.panels) {
        return {
            activeWorkspaceId: persisted.activeWorkspaceId,
            activePanelId: persisted.activePanelId,
            panels: persisted.panels,
            layoutRoot: persisted.layoutRoot ?? defaultLayout, // fallback
        };
    }

    // Ha nincs panels, akkor layout se kell
    return {
        activeWorkspaceId: persisted.activeWorkspaceId,
        activePanelId: persisted.activePanelId,
    };
}