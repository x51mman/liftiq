import type {
    PanelId,
    FloatingNode,
} from "../../../model";

import {
    replaceLayoutNode,
    removeLayoutNode,
    collapseSingleChildSplit,
    findPanelContainerLocation,
} from "../../tree";

import {
    removePanelFromTabsNode,
    collapseTabsNode,
} from "../tabs";

import {
    createLayoutNodeId,
} from "../id";

import type {
    WorkspaceLayout,
} from "../../../model";

type Result = {
    layout: WorkspaceLayout;
};

export function executeFloatPanelCommand(
    layout: WorkspaceLayout,
    panelId: PanelId,
): Result {


    const location =
        findPanelContainerLocation(
            layout.root,
            panelId,
        );

    if (!location) {
        return {
            layout,
        };
    }

    let nextRoot =
        layout.root;

    switch (
    location.container.type
    ) {

        case "panel":

            nextRoot =
                removeLayoutNode(
                    nextRoot,
                    location.container.id,
                );

            break;

        case "tabs":

            nextRoot =
                replaceLayoutNode(
                    nextRoot,
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

    nextRoot =
        collapseSingleChildSplit(
            nextRoot,
        );

    const floatingNode: FloatingNode = {

        type: "floating",

        id:
            createLayoutNodeId(),

        panelId,

        x: 120,
        y: 120,

        width: 800,
        height: 600,
    };

    return {
        layout: {

            root:
                nextRoot,

            floating: [
                ...layout.floating,
                floatingNode,
            ],
        },
    };

}
