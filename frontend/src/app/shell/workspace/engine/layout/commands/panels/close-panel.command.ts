import type {
    PanelId,
    WorkspaceState,
} from "@model";

import {
    removePanelFromContainer,
} from "../../docking";

import {
    findFocusCandidate,
} from "../../../focus";

import {
    findPanelContainerLocation,
} from "@tree";

type Result = Pick<
    WorkspaceState,
    "panels" |
    "activePanelId" |
    "layout"

>;

export function executeClosePanelCommand(
    state: WorkspaceState,
    panelId: PanelId,
): Result {
    /*
    * Megkeressük azt a floating ablakot,
    * amelynek layoutfájában a panel található.
    */
    const sourceWindow = state.layout.floating.find(
        window =>
            findPanelContainerLocation(
                window.root,
                panelId,
            ) !== null,
    );

    const isFloating = sourceWindow !== undefined;

    /*
     * Ha a panel nem található floating ablakban,
     * ellenőrizzük a panel registry állapotát.
     */
    const isDocked =
        !isFloating &&
        state.panels.some(
            panel =>
                panel.id === panelId &&
                panel.state !== "closed",
        );

    /*
     * Ha a panel nincs használatban,
     * nincs mit bezárni.
     */
    if (!isFloating && !isDocked) {
        return {
            panels: state.panels,
            activePanelId: state.activePanelId,
            layout: state.layout,
        };
    }

    /*
     * A következő fókuszjelöltet a bezárás előtt
     * keressük meg.
     */
    const focusCandidate = findFocusCandidate(
        state.layout,
        panelId,
    );

    /*
     * A panel registry állapotának frissítése.
     */
    const panels = state.panels.map(
        panel =>
            panel.id === panelId
                ? {
                    ...panel,
                    state: "closed" as const,
                }
                : panel,
    );

    /*
     * A megfelelő floating ablak layoutfájából
     * eltávolítjuk a panelt.
     *
     * Ha az ablak csak ezt a panelt tartalmazza,
     * magát az ablakot is eltávolítjuk.
     */
    let floating = state.layout.floating;

    if (sourceWindow) {
        const nextRoot = removePanelFromContainer(
            sourceWindow.root,
            panelId,
        );

        const remainingFloating =
            findPanelContainerLocation(
                nextRoot,
                panelId,
            ) !== null;

        if (remainingFloating) {
            /*
             * Ha a panel valamilyen okból nem került ki
             * a fából, nem módosítjuk a layoutot.
             */
            return {
                panels: state.panels,
                activePanelId: state.activePanelId,
                layout: state.layout,
            };
        }

        /*
         * Ha az eredeti gyökér egy önálló panel volt,
         * az egész ablak megszűnik.
         *
         * Összetett ablak esetén megtartjuk az ablakot,
         * és frissítjük a gyökerét.
         */
        if (sourceWindow.root.type === "panel") {
            floating = floating.filter(
                window => window.id !== sourceWindow.id,
            );
        } else {
            floating = floating.map(
                window =>
                    window.id === sourceWindow.id
                        ? {
                            ...window,
                            root: nextRoot,
                        }
                        : window,
            );
        }
    }

    /*
     * Ha a bezárt panel volt aktív,
     * a következő jelölt kapja meg a fókuszt.
     */
    const activePanelId =
        state.activePanelId === panelId
            ? focusCandidate
            : state.activePanelId;

    return {
        panels,
        activePanelId,
        layout: {
            ...state.layout,
            floating,
        },
    };
}
