import type {
    LayoutNode,
    PanelId,
} from "@model";

import {
    replaceLayoutNode,
    findPanelContainerLocation,
} from "@tree";

import {
    createTabsNode,
} from "@model";

import {
    addPanelToTabsNode,
} from "../tabs";

export function insertPanelAsTab(
    root: LayoutNode,
    sourcePanelId: PanelId,
    targetPanelId: PanelId,
): LayoutNode {

    const target =
        findPanelContainerLocation(
            root,
            targetPanelId,
        );

    if (!target) {
        return root;
    }

    return replaceLayoutNode(
        root,
        target.container.id,
        (node) => {

            switch (node.type) {

                case "panel":

                    return createTabsNode(
                        [
                            node.panelId,
                            sourcePanelId,
                        ],
                        sourcePanelId,
                    );

                case "tabs":

                    return addPanelToTabsNode(
                        node,
                        sourcePanelId,
                    );

                default:

                    return node;
            }
        },
    );
}