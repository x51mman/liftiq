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
    * Megkeressük, hogy a panel szerepel-e
    * valamelyik floating ablak layoutfájában.
    */
    const isFloating = state.layout.floating.some(
        window =>
            findPanelContainerLocation(
                window.root,
                panelId,
            ) !== null,
    );

    /*
     * Ha a panel nincs egyetlen floating ablakban sem,
     * jelenleg nem fókuszálható.
     */
    if (!isFloating) {
        return {
            activePanelId: state.activePanelId,
        };
    }

    return {
        activePanelId: panelId,
    };
}
