import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    removePanelFromContainer,
} from "../../docking";

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

export function executeUndockPanelCommand(
    layout: WorkspaceLayout,
    panelId: PanelId,
): Result {
    /*
     * 1. Megkeressük azt az ablakot,
     *    amelyik a panelt tartalmazza.
     */
    const sourceWindow = layout.floating.find(
        window =>
            findPanelContainerLocation(
                window.root,
                panelId,
            ) !== null,
    );

    if (!sourceWindow) {
        return { layout };
    }

    /*
     * 2. Csak összetett ablakból lehet
     *    panelt kiemelni.
     */
    if (sourceWindow.root.type === "panel") {
        return { layout };
    }

    /*
     * 3. Eltávolítjuk a panelt az eredeti
     *    ablak elrendezéséből.
     */
    const nextRoot = removePanelFromContainer(
        sourceWindow.root,
        panelId,
    );

    /*
     * 4. Ellenőrizzük, hogy az eltávolítás
     *    után maradt-e érvényes elrendezés.
     *
     * A removePanelFromContainer a meglévő
     * tree-segéd, ezért ellenőrizzük, hogy
     * a kiemelt panel valóban kikerült-e.
     */
    const panelStillPresent =
        findPanelContainerLocation(
            nextRoot,
            panelId,
        ) !== null;

    if (panelStillPresent) {
        return { layout };
    }

    /*
     * 5. Az új ablak a legmagasabb
     *    z-index fölé kerül.
     */
    const nextZIndex = getNextFloatingZIndex(
        layout.floating,
    );

    const floatingWindow = createFloatingWindow(
        panelId,
        nextZIndex,
    );

    /*
     * 6. Frissítjük az eredeti ablakot,
     *    és hozzáadjuk az új lebegő ablakot.
     */
    return {
        layout: {
            ...layout,
            floating: [
                ...layout.floating.map(window =>
                    window.id === sourceWindow.id
                        ? {
                            ...window,
                            root: nextRoot,
                        }
                        : window,
                ),
                floatingWindow,
            ],
        },
    };
}