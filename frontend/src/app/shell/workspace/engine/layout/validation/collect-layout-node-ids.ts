import type {
    LayoutNode,
} from "../../../model";

import {
    visitLayout,
} from "../../tree";

export function collectLayoutNodeIds(
    root: LayoutNode,
): string[] {

    const ids =
        new Set<string>();

    visitLayout(
        root,
        node => {

            ids.add(
                node.id,
            );
        },
    );

    return [
        ...ids,
    ];
}