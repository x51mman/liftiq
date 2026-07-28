import type {
    LayoutNode,
    PanelId,
    DockPreviewPosition,
} from "@model";

import {
    replaceLayoutNode,
    findPanelContainerLocation,
} from "@tree";

import {
    insertPanelAsTab,
} from "./insert-panel-as-tab";

import {
    createPanelNode,
} from "@model";

import {
    createDockedSplitNode,
} from "./create-docked-split-node";

export function dockPanelIntoContainer(
    root: LayoutNode,
    sourcePanelId: PanelId,
    targetPanelId: PanelId,
    position: DockPreviewPosition,
): LayoutNode {

    if (position === "tab") {

        return insertPanelAsTab(
            root,
            sourcePanelId,
            targetPanelId,
        );
    }

    const targetLocation =
        findPanelContainerLocation(
            root,
            targetPanelId,
        );

    if (!targetLocation) {
        return root;
    }

    const sourceNode =
        createPanelNode(
            sourcePanelId,
        );

    return replaceLayoutNode(
        root,
        targetLocation.container.id,
        node =>
            createDockedSplitNode(
                node,
                sourceNode,
                position,
            ),
    );
}