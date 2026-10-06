import type {
    LayoutNode,
    SplitNode,
} from "../../../model/panel-layout.types";

import type {
    ResizeSnapshot,
} from "./resize-snapshot";

type ResizeChildrenResult = {
    sizes: number[];
    children: LayoutNode[];
    appliedDelta: number;
};

type ResizeChildrenOptions = {
    sizes: number[];
    children: LayoutNode[];
    minSizes: number[];
    index: number;
    delta: number;
    containerSize: number;
    direction:
    | "horizontal"
    | "vertical";
    snapshot: ResizeSnapshot;
};

const EPSILON =
    0.000001;

function toPixelSizes(
    sizes: number[],
    containerSize: number,
): number[] {

    return sizes.map(
        size =>
            Math.max(0, size) /
            100 *
            containerSize,
    );
}

function toPercentSizes(
    pixelSizes: number[],
    containerSize: number,
): number[] {

    if (
        containerSize <= 0
    ) {
        return pixelSizes.map(
            () => 0,
        );
    }

    const result =
        pixelSizes.map(
            size =>
                size /
                containerSize *
                100,
        );

    const total =
        result.reduce(
            (
                sum,
                size,
            ) =>
                sum + size,
            0,
        );

    const correction =
        100 - total;

    if (
        result.length > 0 &&
        Math.abs(
            correction,
        ) > EPSILON
    ) {
        result[
            result.length - 1
        ] += correction;
    }

    return result;
}

function getMinimums(
    minSizes: number[],
    count: number,
): number[] {

    return Array.from(
        {
            length: count,
        },
        (_, index) =>
            Math.max(
                0,
                minSizes[index] ?? 0,
            ),
    );
}

/**
 * Shrinks a group of children equally.
 *
 * A child that reaches its minimum is
 * removed from the active group.
 *
 * The remaining reduction is then
 * redistributed between the children
 * that are still allowed to shrink.
 */
function shrinkEqually(
    pixelSizes: number[],
    minimums: number[],
    indexes: number[],
    requestedReductionPx: number,
): number {

    let remaining =
        Math.max(
            0,
            requestedReductionPx,
        );

    const active =
        new Set(
            indexes.filter(
                index =>
                    (
                        pixelSizes[index]
                        ?? 0
                    ) >
                    (
                        minimums[index]
                        ?? 0
                    ) +
                    EPSILON,
            ),
        );

    while (
        remaining > EPSILON &&
        active.size > 0
    ) {

        const share =
            remaining /
            active.size;

        let consumed =
            0;

        for (
            const index
            of Array.from(active)
        ) {

            const current =
                pixelSizes[index] ?? 0;

            const minimum =
                minimums[index] ?? 0;

            const available =
                Math.max(
                    0,
                    current - minimum,
                );

            const reduction =
                Math.min(
                    share,
                    available,
                );

            pixelSizes[index] =
                current -
                reduction;

            consumed +=
                reduction;

            if (
                pixelSizes[index] <=
                minimum +
                EPSILON
            ) {

                pixelSizes[index] =
                    minimum;

                active.delete(
                    index,
                );
            }
        }

        if (
            consumed <= EPSILON
        ) {
            break;
        }

        remaining -=
            consumed;
    }

    return (
        requestedReductionPx -
        Math.max(
            0,
            remaining,
        )
    );
}

/**
 * Grows a group while preserving its
 * current internal proportions.
 */
function growProportionally(
    pixelSizes: number[],
    indexes: number[],
    growthPx: number,
): void {

    if (
        indexes.length === 0 ||
        growthPx <= EPSILON
    ) {
        return;
    }

    const total =
        indexes.reduce(
            (
                sum,
                index,
            ) =>
                sum +
                Math.max(
                    0,
                    pixelSizes[index] ?? 0,
                ),
            0,
        );

    if (
        total <= EPSILON
    ) {

        pixelSizes[
            indexes[0]
        ] =
            (
                pixelSizes[
                indexes[0]
                ] ?? 0
            ) +
            growthPx;

        return;
    }

    for (
        const index
        of indexes
    ) {

        const current =
            Math.max(
                0,
                pixelSizes[index] ?? 0,
            );

        const ratio =
            current /
            total;

        pixelSizes[index] =
            current +
            growthPx *
            ratio;
    }
}

/**
 * Resizes a nested SplitNode when the
 * size of its parent allocation changes.
 *
 * This is intentionally independent from
 * a divider. There is no selected divider
 * inside the nested split here.
 *
 * When shrinking:
 *   all children shrink equally until
 *   one reaches minimum, then that child
 *   drops out and the remaining reduction
 *   is distributed among the others.
 *
 * When growing:
 *   the existing proportions are preserved.
 */
function resizeNestedSplit(
    split: SplitNode,
    oldContainerSize: number,
    newContainerSize: number,
    snapshot: ResizeSnapshot,
): SplitNode {

    if (
        oldContainerSize <= 0 ||
        newContainerSize <= 0
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

    const pixelSizes =
        toPixelSizes(
            split.sizes,
            oldContainerSize,
        );

    const minimums =
        getMinimums(
            minSizes,
            split.children.length,
        );

    const difference =
        newContainerSize -
        oldContainerSize;

    if (
        Math.abs(difference) <=
        EPSILON
    ) {
        return split;
    }

    const indexes =
        pixelSizes.map(
            (_, index) =>
                index,
        );

    if (
        difference < 0
    ) {

        const available =
            indexes.reduce(
                (
                    total,
                    index,
                ) =>
                    total +
                    Math.max(
                        0,
                        (
                            pixelSizes[
                            index
                            ] ?? 0
                        ) -
                        (
                            minimums[
                            index
                            ] ?? 0
                        ),
                    ),
                0,
            );

        const actualReduction =
            Math.min(
                Math.abs(
                    difference,
                ),
                available,
            );

        shrinkEqually(
            pixelSizes,
            minimums,
            indexes,
            actualReduction,
        );

    } else {

        growProportionally(
            pixelSizes,
            indexes,
            difference,
        );
    }

    /*
     * The parent changed the amount of space
     * available to this nested split.
     *
     * Now propagate that change further down
     * into nested splits that use the same
     * layout direction.
     */
    const nextChildren =
        split.children.map(
            (
                child,
                index,
            ) => {

                if (
                    child.type !==
                    "split"
                ) {
                    return child;
                }

                if (
                    child.direction !==
                    split.direction
                ) {
                    /*
                     * The parent changed the
                     * orthogonal dimension.
                     *
                     * The child's own split
                     * dimension is unchanged.
                     */
                    return child;
                }

                const oldSize =
                    pixelSizes[index]
                    ?? 0;

                /*
                 * At this point pixelSizes
                 * contains the NEW size, so
                 * reconstruct the old value
                 * from the original split
                 * percentages.
                 */
                const originalOldSize =
                    (
                        split.sizes[
                        index
                        ] ?? 0
                    ) /
                    100 *
                    oldContainerSize;

                return resizeNestedSplit(
                    child,
                    originalOldSize,
                    oldSize,
                    snapshot,
                );
            },
        );

    return {
        ...split,
        sizes:
            toPercentSizes(
                pixelSizes,
                newContainerSize,
            ),
        children:
            nextChildren,
    };
}

/**
 * Resizes the direct children around
 * one selected divider.
 */
export function resizeSplitChildren({
    sizes,
    children,
    minSizes,
    index,
    delta,
    containerSize,
    direction,
    snapshot,
}: ResizeChildrenOptions): ResizeChildrenResult {

    const count =
        sizes.length;

    if (
        count < 2 ||
        children.length !== count ||
        index < 0 ||
        index >= count - 1 ||
        containerSize <= 0
    ) {
        return {
            sizes: [...sizes],
            children: [...children],
            appliedDelta: 0,
        };
    }

    const pixelSizes =
        toPixelSizes(
            sizes,
            containerSize,
        );

    const minimums =
        getMinimums(
            minSizes,
            count,
        );

    const requestedDeltaPx =
        delta /
        100 *
        containerSize;

    if (
        Math.abs(
            requestedDeltaPx,
        ) <= EPSILON
    ) {
        return {
            sizes: [...sizes],
            children: [...children],
            appliedDelta: 0,
        };
    }

    /*
     * Negative divider movement:
     *
     * left/top side shrinks
     * right/bottom side grows
     *
     * Positive divider movement:
     *
     * left/top side grows
     * right/bottom side shrinks
     */
    const shrinkingIndexes =
        requestedDeltaPx < 0
            ? Array.from(
                {
                    length:
                        index + 1,
                },
                (_, offset) =>
                    index - offset,
            )
            : Array.from(
                {
                    length:
                        count -
                        index -
                        1,
                },
                (_, offset) =>
                    index + 1 + offset,
            );

    const growingIndexes =
        requestedDeltaPx < 0
            ? Array.from(
                {
                    length:
                        count -
                        index -
                        1,
                },
                (_, offset) =>
                    index + 1 + offset,
            )
            : Array.from(
                {
                    length:
                        index + 1,
                },
                (_, offset) =>
                    index - offset,
            );

    const availablePx =
        shrinkingIndexes.reduce(
            (
                total,
                childIndex,
            ) =>
                total +
                Math.max(
                    0,
                    (
                        pixelSizes[
                        childIndex
                        ] ?? 0
                    ) -
                    (
                        minimums[
                        childIndex
                        ] ?? 0
                    ),
                ),
            0,
        );

    const requestedReductionPx =
        Math.abs(
            requestedDeltaPx,
        );

    const actualReductionRequestPx =
        Math.min(
            requestedReductionPx,
            availablePx,
        );

    if (
        actualReductionRequestPx <=
        EPSILON
    ) {
        return {
            sizes: [...sizes],
            children: [...children],
            appliedDelta: 0,
        };
    }

    const appliedReductionPx =
        shrinkEqually(
            pixelSizes,
            minimums,
            shrinkingIndexes,
            actualReductionRequestPx,
        );

    if (
        appliedReductionPx <=
        EPSILON
    ) {
        return {
            sizes: [...sizes],
            children: [...children],
            appliedDelta: 0,
        };
    }

    /*
     * Give exactly the same amount of
     * space to the opposite side.
     */
    growProportionally(
        pixelSizes,
        growingIndexes,
        appliedReductionPx,
    );

    /*
     * The direct child sizes have now changed.
     *
     * If one of them is a nested split and
     * uses the same direction, its own
     * internal children must follow the
     * change recursively.
     */
    const nextChildren =
        children.map(
            (
                child,
                childIndex,
            ) => {

                if (
                    child.type !==
                    "split"
                ) {
                    return child;
                }

                if (
                    child.direction !==
                    direction
                ) {
                    /*
                     * Orthogonal split:
                     * its own split axis did
                     * not change.
                     */
                    return child;
                }

                const oldChildSize =
                    (
                        sizes[
                        childIndex
                        ] ?? 0
                    ) /
                    100 *
                    containerSize;

                const newChildSize =
                    pixelSizes[
                    childIndex
                    ] ?? 0;

                return resizeNestedSplit(
                    child,
                    oldChildSize,
                    newChildSize,
                    snapshot,
                );
            },
        );

    const nextSizes =
        toPercentSizes(
            pixelSizes,
            containerSize,
        );

    const appliedDelta =
        requestedDeltaPx < 0
            ? -appliedReductionPx
            : appliedReductionPx;

    return {
        sizes:
            nextSizes,

        children:
            nextChildren,

        appliedDelta:
            appliedDelta /
            containerSize *
            100,
    };
}