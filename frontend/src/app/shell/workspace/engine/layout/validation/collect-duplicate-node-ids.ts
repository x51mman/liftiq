import type {
    LayoutNode,
} from "@model";

import {
    visitLayout,
} from "@tree";

export function collectDuplicateNodeIds(
    root: LayoutNode,
): string[] {

    const seen =
        new Set<string>();

    const duplicates =
        new Set<string>();

    visitLayout(
        root,
        node => {

            if (
                seen.has(
                    node.id,
                )
            ) {
                duplicates.add(
                    node.id,
                );

                return;
            }

            seen.add(
                node.id,
            );
        },
    );

    return [
        ...duplicates,
    ];
}