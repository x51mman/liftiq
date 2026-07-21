import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import { removePanelFromContainer } from "../../docking";

import { createFloatingNode } from "../../floating";

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

    const floatingNode =
        createFloatingNode(
            panelId,
        );

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