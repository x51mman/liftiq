import type {
    LayoutNode,
} from "@model";

import {
    calculateLayoutMinSize,
} from "../../../renderer/layout-min-size";

export type SplitChildMinSize = {
    width: number;
    height: number;
};

export function calculateSplitChildMinSizes(
    children: LayoutNode[],
): SplitChildMinSize[] {

    return children.map(
        child =>
            calculateLayoutMinSize(
                child,
            ),
    );
}