import type {
    WorkspaceLayout,
} from "@model";

import {
    getNextFloatingZIndex,
} from "../../floating";

type Result = {
    layout: WorkspaceLayout;
};

export function executeBringFloatingWindowToFrontCommand(
    layout: WorkspaceLayout,
    nodeId: string,
): Result {

    const target =
        layout.floating.find(
            node =>
                node.id === nodeId,
        );

    if (!target) {
        return {
            layout,
        };
    }

    const nextZIndex =
        getNextFloatingZIndex(
            layout.floating,
        );

    const updatedTarget = {
        ...target,
        zIndex: nextZIndex,
    };

    return {
        layout: {

            ...layout,

            floating: [
                ...layout.floating.filter(
                    node =>
                        node.id !== nodeId,
                ),

                updatedTarget,
            ],
        },
    };
}