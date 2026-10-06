import type {
    LayoutNode,
} from "@model";

import {
    updateSplitSizes,
} from "@tree";

import {
    resizeSplitChildren,
} from "../../resize/resize-split-children";

import type {
    ResizeSnapshot,
} from "../../resize/resize-snapshot";

export function resizeSplitCommand(
    layout: LayoutNode,
    splitId: string,
    index: number,
    delta: number,
    containerSize: number,
    snapshot: ResizeSnapshot,
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

            const minSizes =
                snapshot.minSizesBySplitId.get(
                    split.id,
                );

            if (!minSizes) {
                return split;
            }

            const result =
                resizeSplitChildren({
                    sizes:
                        split.sizes,

                    children:
                        split.children,

                    minSizes,

                    index,

                    delta,

                    containerSize,

                    direction:
                        split.direction,

                    snapshot,
                });

            return {
                ...split,

                sizes:
                    result.sizes,

                children:
                    result.children,
            };
        },
    );
}