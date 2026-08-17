import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    findPanelContainerLocation,
} from "@tree";

import {
    createFloatingNode,
} from "../../floating";

type Result = {
    layout: WorkspaceLayout;
};

export function executeOpenPanelCommand(
    layout: WorkspaceLayout,
    panelId: PanelId,
): Result {

    /*
     * Már floating?
     *
     * Egy panelből csak egy példány
     * lehet.
     */
    const alreadyFloating =
        layout.floating.some(
            node =>
                node.panelId === panelId,
        );

    if (alreadyFloating) {
        return {
            layout,
        };
    }

    /*
     * Már a dock layoutban van?
     */
    const location =
        findPanelContainerLocation(
            layout.root,
            panelId,
        );

    if (location) {
        return {
            layout,
        };
    }

    /*
     * A panel jelenleg sehol nincs.
     *
     * Az alkalmazás első megnyitása
     * floating window-ként történik.
     */
    const floatingNode =
        createFloatingNode(
            panelId,
        );

    return {
        layout: {

            ...layout,

            floating: [
                ...layout.floating,
                floatingNode,
            ],
        },
    };
}