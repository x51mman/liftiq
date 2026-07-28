import type {
    LayoutNode,
    PanelId,
    SplitDirection,
} from "@model";

import {
    replaceLayoutNode,
    findPanelContainerLocation,
} from "@tree";

import {
    createLayoutNodeId,
} from "../id";

import {
    createPanelNode,
} from "@model";

import type {
    DockPreviewPosition,
} from "@model";

export function insertPanelAsSplit(
    root: LayoutNode,
    sourcePanelId: PanelId,
    targetPanelId: PanelId,
    position: Exclude<
        DockPreviewPosition,
        "tab"
    >,
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
        node => {

            const direction:
                SplitDirection =

                position === "left" ||
                    position === "right"
                    ? "horizontal"
                    : "vertical";

            const sourceNode =
                createPanelNode(
                    sourcePanelId,
                );

            const splitChildren =

                position === "left" ||
                    position === "top"

                    ? [
                        sourceNode,
                        node,
                    ]

                    : [
                        node,
                        sourceNode,
                    ];

            return {

                type: "split",

                id:
                    createLayoutNodeId(),

                direction,

                sizes: [50, 50],

                children:
                    splitChildren,
            };
        },
    );
}