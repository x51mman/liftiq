import type { SplitNode } from "../../../model/panel-layout.types";

import { calculateLayoutMinSize } from "../../../renderer";

export type ResizeSnapshot = {
    rootSplitId: string;

    minSizesBySplitId:
    Map<string, number[]>;
};

function collectSplitSnapshots(
    node: SplitNode,
    map: Map<string, number[]>,
): void {

    const childMinSizes =
        node.children.map(
            child =>
                calculateLayoutMinSize(
                    child,
                ),
        );

    const minSizes =
        node.direction === "horizontal"
            ? childMinSizes.map(
                size =>
                    size.width,
            )
            : childMinSizes.map(
                size =>
                    size.height,
            );

    map.set(
        node.id,
        minSizes,
    );

    for (
        const child
        of node.children
    ) {
        if (
            child.type !== "split"
        ) {
            continue;
        }

        collectSplitSnapshots(
            child,
            map,
        );
    }
}

export function createResizeSnapshot(
    root: SplitNode,
): ResizeSnapshot {

    const minSizesBySplitId =
        new Map<string, number[]>();

    collectSplitSnapshots(
        root,
        minSizesBySplitId,
    );

    return {
        rootSplitId:
            root.id,

        minSizesBySplitId,
    };
}