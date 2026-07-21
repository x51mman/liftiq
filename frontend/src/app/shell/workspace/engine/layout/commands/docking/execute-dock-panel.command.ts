import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    dockPanelIntoContainer,
} from "../../docking";

type Result = {
    layout: WorkspaceLayout;
};

export function executeDockPanelCommand(
    layout: WorkspaceLayout,
    sourcePanelId: PanelId,
    targetPanelId: PanelId,
): Result {

    const isFloating =
        layout.floating.some(
            node =>
                node.panelId === sourcePanelId,
        );

    if (!isFloating) {
        return {
            layout,
        };
    }

    const nextRoot =
        dockPanelIntoContainer(
            layout.root,
            sourcePanelId,
            targetPanelId,
            "tab",
        );

    return {

        layout: {

            root:
                nextRoot,

            floating:
                layout.floating.filter(
                    node =>
                        node.panelId !==
                        sourcePanelId,
                ),
        },
    };
}