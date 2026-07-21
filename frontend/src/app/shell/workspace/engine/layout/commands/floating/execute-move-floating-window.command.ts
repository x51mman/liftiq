import type {
    WorkspaceLayout,
} from "@model";

import {
    updateFloatingNode,
} from "./update-floating-node";

type Result = {
    layout: WorkspaceLayout;
};

export function executeMoveFloatingWindowCommand(
    layout: WorkspaceLayout,
    nodeId: string,
    x: number,
    y: number,
): Result {

    return {

        layout:

            updateFloatingNode(
                layout,
                nodeId,
                node => ({

                    ...node,

                    x,
                    y,
                }),
            ),
    };
}