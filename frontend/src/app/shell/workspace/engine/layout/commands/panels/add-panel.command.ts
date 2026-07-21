import type {
    PanelId,
    WorkspaceState,
} from "@model";

import {
    createWorkspacePanel,
} from "@model";

export function executeAddPanelCommand(
    state: WorkspaceState,
    panelId: PanelId,
): Pick<
    WorkspaceState,
    "panels"
> {

    const exists =
        state.panels.some(
            panel =>
                panel.id === panelId,
        );

    if (exists) {
        return {
            panels:
                state.panels,
        };
    }

    return {

        panels: [

            ...state.panels,

            createWorkspacePanel(
                panelId,
            ),
        ],
    };
}