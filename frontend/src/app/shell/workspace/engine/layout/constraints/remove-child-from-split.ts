import type {
    SplitNode,
} from "../../../model";

import {
    normalizeSizes,
} from "../resize";

export function removeChildFromSplit(
    split: SplitNode,
    index: number,
): SplitNode {

    const removedSize =
        split.sizes[index] ?? 0;

    const children =
        split.children.filter(
            (_, childIndex) =>
                childIndex !== index,
        );

    const sizes =
        split.sizes.filter(
            (_, sizeIndex) =>
                sizeIndex !== index,
        );

    if (sizes.length === 0) {
        return {
            ...split,
            children,
            sizes,
        };
    }

    const redistribution =
        removedSize /
        sizes.length;

    const nextSizes =
        sizes.map(
            size =>
                size +
                redistribution,
        );

    return {
        ...split,
        children,
        sizes:
            normalizeSizes(
                nextSizes,
            ),
    };
}