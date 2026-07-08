import type {
    LayoutNode,
    PanelId,
    TabsNode,
} from "../../../model";

import {
    replaceLayoutNode,
    removeLayoutNode,
    collapseSingleChildSplit,
} from "../../tree";

import {
    createLayoutNodeId,
} from "../id";

type Result = {
    layout: LayoutNode;
};

export function executeTabPanelCommand(
    layout: LayoutNode,
    sourcePanelId: PanelId,
    targetPanelId: PanelId,
): Result {

    const sourceNodeId =
        `${sourcePanelId}-root`;

    const targetNodeId =
        `${targetPanelId}-root`;

    let nextLayout =
        replaceLayoutNode(
            layout,
            targetNodeId,
            (node) => {

                if (
                    node.type !== "panel"
                ) {
                    return node;
                }

                const tabsNode: TabsNode = {

                    type: "tabs",

                    id:
                        createLayoutNodeId(),

                    activePanelId:
                        targetPanelId,

                    panelIds: [
                        targetPanelId,
                        sourcePanelId,
                    ],
                };

                return tabsNode;
            },
        );

    nextLayout =
        removeLayoutNode(
            nextLayout,
            sourceNodeId,
        );

    nextLayout =
        collapseSingleChildSplit(
            nextLayout,
        );

    return {
        layout: nextLayout,
    };
}