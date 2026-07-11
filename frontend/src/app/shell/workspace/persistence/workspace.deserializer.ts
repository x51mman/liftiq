import type { PersistedWorkspaceState } from "../model";
import type { WorkspaceRestorePayload } from "../model/workspace.types";
import { defaultLayout } from "../model/default-layout";

export function deserializeWorkspace(
    persisted: PersistedWorkspaceState
): WorkspaceRestorePayload {
    if ('panels' in persisted) {
        // TS itt tudja: persisted is PersistedWorkspaceV2
        return {
            activeWorkspaceId: persisted.activeWorkspaceId,
            activePanelId: persisted.activePanelId,
            panels: persisted.panels,
            layout: persisted.layout ?? defaultLayout, // biztosan van
        };
    }

    // TS itt tudja: persisted is PersistedWorkspaceLegacy
    return {
        activeWorkspaceId: persisted.activeWorkspaceId,
        activePanelId: persisted.activePanelId,
        panels: [], // default
        layout: defaultLayout, // default
    };
}