import type {
    PanelId,
    WorkspaceState,
} from "@model";

import {
    removePanelFromContainer,
} from "../../docking";

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
     * 1. Panel state
     *
     * A panel továbbra is szerepel a workspace
     * panel-regiszterében, de closed állapotba kerül.
     */
    const panels =
        state.panels.map(
            panel =>
                panel.id === panelId
                    ? {
                        ...panel,
                        state: "closed" as const,
                    }
                    : panel,
        );

    /*
     * 2. Active panel
     *
     * A focus következő lépésben lesz kezelve.
     * Most csak akkor töröljük az activePanelId-t,
     * ha ténylegesen ezt a panelt zárjuk be.
     */
    const activePanelId =
        state.activePanelId === panelId
            ? null
            : state.activePanelId;

    /*
     * 3. Floating panel eltávolítása
     *
     * Ha a panel floating állapotban van,
     * egyszerűen kivesszük a floating node-ok közül.
     */
    const floating =
        state.layout.floating.filter(
            node =>
                node.panelId !== panelId,
        );

    /*
     * 4. Docked / tab / root panel eltávolítása
     *
     * Ha a panel nem floatingként létezik,
     * akkor a layout tree-ből távolítjuk el.
     *
     * A removePanelFromContainer() már kezeli:
     *
     * - panel node
     * - tabs node
     * - split node
     * - tabs collapse
     * - split collapse
     */
    const isFloating =
        state.layout.floating.some(
            node =>
                node.panelId === panelId,
        );

    const root =
        isFloating
            ? state.layout.root
            : removePanelFromContainer(
                state.layout.root,
                panelId,
            );

    return {
        panels,

        activePanelId,

        layout: {
            root,
            floating,
        },
    };
}