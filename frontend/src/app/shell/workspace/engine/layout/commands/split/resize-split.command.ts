import type {
    LayoutNode,
} from "@model";

import {
    updateSplitSizes,
} from "@tree";

import {
    normalizeSizes, applyResizeConstraints
} from "../../resize";

export function resizeSplitCommand(
    layout: LayoutNode,
    splitId: string,
    index: number,
    delta: number,
): LayoutNode {

    return updateSplitSizes(
        layout,
        splitId,
        (split) => {

            const sizes = [...split.sizes];

            const left = sizes[index];
            const right = sizes[index + 1];

            if (
                left === undefined ||
                right === undefined
            ) {
                return split;
            }

            const resized =
                applyResizeConstraints(
                    left,
                    right,
                    delta,
                );

            sizes[index] =
                resized.leftSize;

            sizes[index + 1] =
                resized.rightSize;

            return {
                ...split,
                sizes:
                    normalizeSizes(
                        sizes,
                    ),
            };
        },
    );
}