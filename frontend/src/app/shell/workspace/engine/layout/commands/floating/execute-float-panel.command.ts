import type { PanelId, WorkspaceLayout } from "@model";

import { removePanelFromContainer } from "../../docking";
import { createFloatingWindow, getNextFloatingZIndex } from "../../floating";
import { findPanelContainerLocation } from "@tree";

type Result = {
    layout: WorkspaceLayout;
};

export function executeFloatPanelCommand(
    layout: WorkspaceLayout,
    panelId: PanelId,
): Result {
    /*
    * Megkeressük, hogy a panel már egy önálló
    * floating ablakban van-e.
    *
    * Az összetett floating ablakban található panel
    * nem számít önállóan floating panelnek:
    * abból továbbra is kiemelhető.
    */
    const alreadyFloating = layout.floating.some(
        window =>
            window.root.type === "panel" &&
            window.root.panelId === panelId,
    );

    if (alreadyFloating) {
        return { layout };
    }

    /*
     * Megkeressük azt a floating ablakot,
     * amelynek saját layoutfájában a panel található.
     */
    const sourceWindow = layout.floating.find(
        window =>
            findPanelContainerLocation(window.root, panelId) !== null,
    );

    /*
     * Ha a panel egyetlen floating ablakban sincs,
     * nincs mit kiemelni.
     */
    if (!sourceWindow) {
        return { layout };
    }

    /*
     * A panel eltávolítása a forrásablak saját
     * layoutfájából.
     */
    const nextRoot = removePanelFromContainer(
        sourceWindow.root,
        panelId,
    );

    /*
     * Védelmi ellenőrzés: csak akkor folytatjuk,
     * ha a panel ténylegesen kikerült a forrásfából.
     */
    const panelStillPresent =
        findPanelContainerLocation(nextRoot, panelId) !== null;

    if (panelStillPresent) {
        return { layout };
    }

    /*
     * Az új floating ablak a legfelső z-indexet kapja.
     */
    const nextZIndex = getNextFloatingZIndex(layout.floating);

    const floatingWindow = createFloatingWindow(
        panelId,
        nextZIndex,
    );

    return {
        layout: {
            ...layout,
            floating: [
                ...layout.floating.map(window =>
                    window.id === sourceWindow.id
                        ? { ...window, root: nextRoot }
                        : window,
                ),
                floatingWindow,
            ],
        },
    };
}