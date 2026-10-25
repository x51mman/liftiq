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

    if (target.zIndex === nextZIndex - 1) {
        return {
            layout,
        };
    }

    const updatedTarget = {
        ...target,
        zIndex: nextZIndex,
    };

    return {
        layout: {
            ...layout,
            floating: layout.floating.map((node) =>
                node.id === nodeId ? updatedTarget : node,
            ),
        },
    };

}