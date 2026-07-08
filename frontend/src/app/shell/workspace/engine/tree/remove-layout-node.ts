import type {
    LayoutNode,
} from "../../model";

import {
    rebuildSplitSizes,
} from "../layout";

export function removeLayoutNode(
    root: LayoutNode,
    nodeId: string,
): LayoutNode {

    switch (root.type) {

        case "split": {

            const children =
                root.children
                    .filter(
                        child =>
                            child.id !== nodeId,
                    )
                    .map(
                        child =>
                            removeLayoutNode(
                                child,
                                nodeId,
                            ),
                    );

            return {
                ...root,
                children,
                sizes:
                    rebuildSplitSizes(
                        children.length,
                    ),
            };
        }

        default:
            return root;
    }
}