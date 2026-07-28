import type {
    DockPreviewPosition,
    LayoutNode,
    SplitNode,
} from "@model";

import {
    createLayoutNodeId,
} from "../id";

export function createDockedSplitNode(
    targetNode: LayoutNode,
    sourceNode: LayoutNode,
    position: Exclude<
        DockPreviewPosition,
        "tab"
    >,
): SplitNode {

    const isHorizontal =

        position === "left" ||
        position === "right";

    const sourceFirst =

        position === "left" ||
        position === "top";

    return {

        type: "split",

        id:
            createLayoutNodeId(),

        direction:
            isHorizontal
                ? "horizontal"
                : "vertical",

        sizes: [50, 50],

        children:
            sourceFirst
                ? [
                    sourceNode,
                    targetNode,
                ]
                : [
                    targetNode,
                    sourceNode,
                ],
    };
}