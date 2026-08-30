import type {
    PanelId,
    WorkspaceState,
} from "@model";

import {
    removePanelFromContainer,
} from "../../docking";

import {
    findFocusCandidate
} from "../../../focus";

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
     * 1. Ellenőrizzük, hogy a panel
     *    ténylegesen jelen van-e a layoutban.
     */
    const isFloating =
        state.layout.floating.some(
            node =>
                node.panelId === panelId,
        );

    const isDocked =
        !isFloating &&
        state.panels.some(
            panel =>
                panel.id === panelId &&
                panel.state !== "closed",
        );

    /*
     * Ha a panel már nincs használatban,
     * nincs mit bezárni.
     */
    if (
        !isFloating &&
        !isDocked
    ) {
        return {
            panels:
                state.panels,

            activePanelId:
                state.activePanelId,

            layout:
                state.layout,
        };
    }

    /*
     * 2. A következő focus candidate-et
     *    MÉG A CLOSE ELŐTT keressük meg.
     *
     *    Ez fontos, mert ekkor még rendelkezésünkre
     *    áll a bezárandó panel teljes layout-környezete.
     */
    const focusCandidate =
        findFocusCandidate(
            state.layout,
            panelId,
        );

    /*
     * 3. Panel registry state
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
     * 4. Floating panel eltávolítása
     */
    const floating =
        state.layout.floating.filter(
            node =>
                node.panelId !== panelId,
        );

    /*
     * 5. Docked panel eltávolítása
     */
    const root =
        isFloating
            ? state.layout.root
            : removePanelFromContainer(
                state.layout.root,
                panelId,
            );

    /*
     * 6. Focus
     *
     * Ha a bezárt panel volt aktív,
     * a candidate kapja meg a fókuszt.
     *
     * Ha nem ő volt aktív, az aktuális
     * focus változatlan marad.
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
            root,
            floating,
        },
    };
}