import type {
    WorkspaceRestorePayload,
    WorkspaceState,
} from "../../../model";

import {
    defaultLayout,
} from "../../../model";

import {
    defaultPanels,
} from "../../../model/factories/default-panels";

export function executeRestoreWorkspaceCommand(
    payload: WorkspaceRestorePayload,
): Pick<
    WorkspaceState,
    | "activeWorkspaceId"
    | "activePanelId"
    | "panels"
    | "layout"
> {

    if (
        "panels" in payload &&
        payload.panels
    ) {
        return {

            activeWorkspaceId:
                payload.activeWorkspaceId,

            activePanelId:
                payload.activePanelId,

            panels:
                payload.panels,

            layout:
                payload.layout,
        };
    }

    return {

        activeWorkspaceId:
            payload.activeWorkspaceId,

        activePanelId:
            payload.activePanelId,

        panels:
            defaultPanels,

        layout:
            defaultLayout,
    };
}