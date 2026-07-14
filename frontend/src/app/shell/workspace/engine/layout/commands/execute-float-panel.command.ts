import type {
    PanelId,
    FloatingNode,
    WorkspaceLayout,
} from "../../../model";

import {
    removePanelFromContainer,
} from "../docking";

import {
    createLayoutNodeId,
} from "../id";

type Result = {
    layout: WorkspaceLayout;
};

export function executeFloatPanelCommand(
    layout: WorkspaceLayout,
    panelId: PanelId,
): Result {

    const alreadyFloating =
        layout.floating.some(
            node =>
                node.panelId === panelId,
        );

    if (alreadyFloating) {
        return {
            layout,
        };
    }

    const nextRoot =
        removePanelFromContainer(
            layout.root,
            panelId,
        );

    const floatingNode: FloatingNode = {

        type: "floating",

        id:
            createLayoutNodeId(),

        panelId,

        x: 120,
        y: 120,

        width: 800,
        height: 600,
    };

    return {

        layout: {

            root:
                nextRoot,

            floating: [
                ...layout.floating,
                floatingNode,
            ],
        },
    };
}