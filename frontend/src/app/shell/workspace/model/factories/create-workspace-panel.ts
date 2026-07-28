import type {
    PanelId,
    WorkspacePanel,
} from "../workspace.types";

import {
    panelMetadata,
} from "../../registry/panel.metadata";

export function createWorkspacePanel(
    panelId: PanelId,
): WorkspacePanel {


    const metadata =
        panelMetadata[panelId];

    return {
        id: panelId,

        workspaceId:
            metadata.workspaceId,

        title:
            metadata.title,

        state:
            metadata.defaultState,
    };

}