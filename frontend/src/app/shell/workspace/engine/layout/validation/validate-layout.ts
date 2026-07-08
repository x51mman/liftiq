import type {
    LayoutNode,
} from "../../../model";

import {
    visitLayout,
} from "../../tree";

import {
    validateSplitNode,
} from "./validate-split-node";

export function validateLayout(
    root: LayoutNode,
): boolean {
    let valid = true;

    visitLayout(root, (node) => {
        switch (node.type) {
            case "split":
                if (
                    node.children.length < 2
                ) {
                    valid = false;
                    return;
                }

                if (
                    !validateSplitNode(
                        node,
                    )
                ) {
                    valid = false;
                }

                break;

            case "tabs":
                if (
                    node.panelIds.length === 0
                ) {
                    valid = false;
                }

                break;
        }
    });

    return valid;
}