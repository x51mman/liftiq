import type {
    PanelId,
    WorkspacePanel,
} from "../workspace.types";

import {
    panelDefinitions,
} from "../../registry";

export function createWorkspacePanel(
    panelId: PanelId,
): WorkspacePanel {
    const definition =
        panelDefinitions[panelId];

    return {

        id:
            definition.id,

        workspaceId:
            definition.workspaceId,

        title:
            definition.title,

        state:
            definition.defaultState,
    };


}