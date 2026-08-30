import type {
    PanelId,
    WorkspaceState,
} from "@model";

import {
    findPanelContainerLocation,
} from "@tree";

type Result = Pick<
    WorkspaceState,
    "activePanelId"
>;

export function executeFocusPanelCommand(
    state: WorkspaceState,
    panelId: PanelId,
): Result {

    /*
     * A panel akkor fókuszálható,
     * ha ténylegesen jelen van a workspace layoutban.
     */

    const isDocked =
        findPanelContainerLocation(
            state.layout.root,
            panelId,
        ) !== null;

    const isFloating =
        state.layout.floating.some(
            node =>
                node.panelId === panelId,
        );

    if (
        !isDocked &&
        !isFloating
    ) {
        return {
            activePanelId:
                state.activePanelId,
        };
    }

    return {
        activePanelId:
            panelId,
    };
}