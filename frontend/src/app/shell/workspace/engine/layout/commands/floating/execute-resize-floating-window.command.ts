import type {
    WorkspaceLayout,
} from "@model";

import {
    updateFloatingNode,
} from "./update-floating-node";

type Result = {
    layout: WorkspaceLayout;
};

export function executeResizeFloatingWindowCommand(
    layout: WorkspaceLayout,
    nodeId: string,
    width: number,
    height: number,
): Result {

    return {

        layout:

            updateFloatingNode(
                layout,
                nodeId,
                node => ({

                    ...node,

                    width,
                    height,
                }),
            ),
    };
}