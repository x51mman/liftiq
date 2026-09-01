import type {
    LayoutNode,
} from "@model";

import {
    updateSplitSizes,
} from "@tree";

import {
    calculateLayoutMinSize,
} from "@/app/shell/workspace/renderer";

import {
    resizeSplitChildren,
} from "../../resize/resize-split-children";

export function resizeSplitCommand(
    layout: LayoutNode,
    splitId: string,
    index: number,
    delta: number,
    containerSize: number,
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
                split.children.map(
                    child =>
                        split.direction ===
                            "horizontal"
                            ? calculateLayoutMinSize(
                                child,
                            ).width
                            : calculateLayoutMinSize(
                                child,
                            ).height,
                );

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