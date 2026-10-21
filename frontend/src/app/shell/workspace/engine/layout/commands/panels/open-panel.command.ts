import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    createFloatingWindow,
    getNextFloatingZIndex,
} from "../../floating";

import {
    findPanelContainerLocation,
} from "@tree";

type Result = {
    layout: WorkspaceLayout;
};

export function executeOpenPanelCommand(
    layout: WorkspaceLayout,
    panelId: PanelId,
): Result {
    /*
     * Ellenőrizzük, hogy a panel már szerepel-e
     * valamelyik floating window layoutfájában.
     *
     * Egy panelből csak egy megnyitott példány
     * lehet a workspace-ben.
     */
    const alreadyOpen = layout.floating.some(
        window =>
            findPanelContainerLocation(
                window.root,
                panelId,
            ) !== null,
    );

    if (alreadyOpen) {
        return {
            layout,
        };
    }

    /*
     * A panel még nincs megnyitva.
     *
     * Létrehozzuk az új FloatingWindowModel
     * objektumot, amelynek saját root layoutfája
     * egyetlen PanelNode-ból áll.
     */
    const nextZIndex =
        getNextFloatingZIndex(
            layout.floating,
        );

    const floatingWindow =
        createFloatingWindow(
            panelId,
            nextZIndex,
        );

    return {
        layout: {
            ...layout,

            floating: [
                ...layout.floating,
                floatingWindow,
            ],
        },
    };
}