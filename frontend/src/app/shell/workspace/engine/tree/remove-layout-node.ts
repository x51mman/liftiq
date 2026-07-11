import type { LayoutNode } from "../../model";

import { removeChildFromSplit } from "../layout";

export function removeLayoutNode(
    root: LayoutNode,
    nodeId: string,
): LayoutNode {

    switch (root.type) {

        case "split": {

            const directChildIndex =
                root.children.findIndex(
                    child =>
                        child.id === nodeId,
                );

            if (
                directChildIndex >= 0
            ) {
                return removeChildFromSplit(
                    root,
                    directChildIndex,
                );
            }

            return {
                ...root,
                children:
                    root.children.map(
                        child =>
                            removeLayoutNode(
                                child,
                                nodeId,
                            ),
                    ),
            };
        }

        default:
            return root;
    }
}