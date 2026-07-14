import type {
    LayoutNode,
    PanelId,
} from "../../../model";

import {
    findPanelContainerLocation,
    replaceLayoutNode,
    removeLayoutNode,
    collapseSingleChildSplit,
} from "../../tree";

import {
    removePanelFromTabsNode,
    collapseTabsNode,
} from "../tabs";

export function removePanelFromContainer(
    layout: LayoutNode,
    panelId: PanelId,
): LayoutNode {

    const location =
        findPanelContainerLocation(
            layout,
            panelId,
        );

    if (!location) {
        return layout;
    }

    let nextLayout =
        layout;

    switch (
    location.container.type
    ) {

        case "panel":

            nextLayout =
                removeLayoutNode(
                    nextLayout,
                    location.container.id,
                );

            break;

        case "tabs":

            nextLayout =
                replaceLayoutNode(
                    nextLayout,
                    location.container.id,
                    (node) => {

                        if (
                            node.type !== "tabs"
                        ) {
                            return node;
                        }

                        return collapseTabsNode(
                            removePanelFromTabsNode(
                                node,
                                panelId,
                            ),
                        );
                    },
                );

            break;
    }

    return collapseSingleChildSplit(
        nextLayout,
    );
}