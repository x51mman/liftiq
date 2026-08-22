import type { PanelId, WorkspaceLayout, } from "@model";

import {
    removePanelFromContainer,
} from "../../docking";

import {
    findPanelContainerLocation,
} from "@tree";

import { getNextFloatingZIndex, createFloatingNode } from "../../floating";

type Result = {
    layout: WorkspaceLayout;
};

export function executeFloatPanelCommand(
    layout: WorkspaceLayout,
    panelId: PanelId,
): Result {

    /*
     * A panel már floating.
     *
     * Ilyenkor nem hozunk létre második
     * floating node-ot.
     *
     * A tényleges "bring to front" műveletet
     * külön command/store művelet kezeli.
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
     * A panelnek jelenleg a workspace layoutban
     * kell lennie.
     *
     * Ha nincs benne, nincs mit floatolni.
     */
    const location =
        findPanelContainerLocation(
            layout.root,
            panelId,
        );

    if (!location) {
        return {
            layout,
        };
    }

    /*
     * A panelt eltávolítjuk az aktuális
     * containerből.
     *
     * Ez lehet:
     * - önálló panel
     * - split
     * - tabs
     * - nested split
     * - tabs egy spliten belül
     */
    const nextRoot =
        removePanelFromContainer(
            layout.root,
            panelId,
        );

    /*
     * Az új floating ablak a jelenlegi
     * floating stack tetejére kerül.
     */
    const nextZIndex =
        getNextFloatingZIndex(
            layout.floating,
        );

    const floatingNode =
        createFloatingNode(
            panelId,
            nextZIndex,
        );

    return {

        layout: {

            root:
                nextRoot,

            floating: [
                ...layout.floating,
                floatingNode,
            ],
        },
    };
}