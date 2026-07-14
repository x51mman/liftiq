import type {
    LayoutNode,
    PanelId,
} from "../../../model";

import {
    insertPanelAsTab,
} from "./insert-panel-as-tab";

export type DockPosition =
    | "tab";

export function dockPanelIntoContainer(
    root: LayoutNode,
    sourcePanelId: PanelId,
    targetPanelId: PanelId,
    position: DockPosition,
): LayoutNode {

    switch (position) {

        case "tab":

            return insertPanelAsTab(
                root,
                sourcePanelId,
                targetPanelId,
            );

        default:

            return root;
    }
}