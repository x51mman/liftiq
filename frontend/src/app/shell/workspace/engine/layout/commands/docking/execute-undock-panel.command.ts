import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    removePanelFromContainer,
} from "../../docking";

import {
    createFloatingNode,
} from "../../floating";

import { findPanelContainerLocation } from "@tree";

type Result = {
    layout: WorkspaceLayout;
};

export function executeUndockPanelCommand(
    layout: WorkspaceLayout,
    panelId: PanelId,
): Result {

    const alreadyFloating =
        layout.floating.some(
            node =>
                node.panelId === panelId,
        );

    const location =
        findPanelContainerLocation(
            layout.root,
            panelId,
        );

    if (!location && alreadyFloating) {
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