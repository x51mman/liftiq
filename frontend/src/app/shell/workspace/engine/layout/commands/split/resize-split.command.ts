import type {
    LayoutNode,
} from "@model";

import {
    updateSplitSizes,
} from "@tree";

import {
    resizeSplitChildren,
} from "../../resize/resize-split-children";

export function resizeSplitCommand(
    layout: LayoutNode,
    splitId: string,
    index: number,
    delta: number,
    containerSize: number,
    minSizes: number[],
): LayoutNode {

    return updateSplitSizes(
        layout,
        splitId,
        split => {

            if (
                containerSize <= 0
            ) {
                return split;
            }

            if (
                index < 0 ||
                index >=
                split.children.length - 1
            ) {
                return split;
            }

            const result =
                resizeSplitChildren({
                    sizes:
                        split.sizes,

                    minSizes,

                    index,

                    delta,

                    containerSize,
                });

            return {
                ...split,
                sizes:
                    result.sizes,
            };
        },
    );
}