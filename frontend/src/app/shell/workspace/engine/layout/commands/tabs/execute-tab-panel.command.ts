import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    findPanelContainerLocation,
} from "@tree";

import {
    insertPanelAsTab,
} from "../../docking";

type Result = {
    layout: WorkspaceLayout;
};

export function executeTabPanelCommand(
    layout: WorkspaceLayout,
    sourcePanelId: PanelId,
    targetPanelId: PanelId,
): Result {

    /*
     * 1. Ugyanazt a panelt nem taboljuk
     *    önmagához.
     */
    if (sourcePanelId === targetPanelId) {
        return { layout };
    }

    /*
     * 2. A forrásablak megkeresése.
     *
     * Taboláskor a forrásablaknak
     * egyszerű, egyetlen panelt tartalmazó
     * lebegő ablaknak kell lennie.
     */
    const sourceWindow = layout.floating.find(
        window =>
            window.root.type === "panel" &&
            window.root.panelId === sourcePanelId,
    );

    if (!sourceWindow) {
        return { layout };
    }

    /*
     * 3. A célablak megkeresése.
     *
     * A célpanel lehet önálló panel,
     * tabs konténerben lévő panel vagy
     * splitstruktúra része.
     */
    const targetWindow = layout.floating.find(
        window =>
            findPanelContainerLocation(
                window.root,
                targetPanelId,
            ) !== null,
    );

    if (!targetWindow) {
        return { layout };
    }

    /*
     * 4. A forrás- és célpanelnek
     *    különböző lebegő ablakban kell lennie.
     */
    if (sourceWindow.id === targetWindow.id) {
        return { layout };
    }

    /*
     * 5. Megpróbáljuk a forráspanelt
     *    a célpanel mellé tabként beilleszteni.
     */
    const nextTargetRoot = insertPanelAsTab(
        targetWindow.root,
        sourcePanelId,
        targetPanelId,
    );

    /*
     * 6. Ellenőrizzük, hogy a forráspanel
     *    valóban bekerült-e a célablakba.
     *
     * Sikertelen beillesztés esetén
     * az eredeti layout változatlan marad.
     */
    const sourceInserted =
        findPanelContainerLocation(
            nextTargetRoot,
            sourcePanelId,
        ) !== null;

    if (!sourceInserted) {
        return { layout };
    }

    /*
     * 7. Sikeres tabolás:
     *
     * - frissítjük a célablak rootját;
     * - eltávolítjuk a forrásablakot.
     */
    return {
        layout: {
            ...layout,
            floating: layout.floating
                .filter(
                    window =>
                        window.id !== sourceWindow.id,
                )
                .map(window =>
                    window.id === targetWindow.id
                        ? {
                            ...window,
                            root: nextTargetRoot,
                        }
                        : window,
                ),
        },
    };
}