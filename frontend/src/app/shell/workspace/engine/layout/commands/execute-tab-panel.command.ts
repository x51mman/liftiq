import type {
    LayoutNode,
    PanelId,
} from "../../../model";

import {
    findPanelContainerLocation,
} from "../../tree";

import {
    isSameTabsContainer,
} from "../tabs";

import {
    insertPanelAsTab,
    removePanelFromContainer,
} from "../docking";

type Result = {
    layout: LayoutNode;
};

export function executeTabPanelCommand(
    layout: LayoutNode,
    sourcePanelId: PanelId,
    targetPanelId: PanelId,
): Result {

    if (
        sourcePanelId === targetPanelId
    ) {
        return {
            layout,
        };
    }

    const source =
        findPanelContainerLocation(
            layout,
            sourcePanelId,
        );

    const target =
        findPanelContainerLocation(
            layout,
            targetPanelId,
        );

    if (
        !source ||
        !target
    ) {
        return {
            layout,
        };
    }

    if (
        isSameTabsContainer(
            source.container,
            target.container,
        )
    ) {
        return {
            layout,
        };
    }

    const detachedLayout =
        removePanelFromContainer(
            layout,
            sourcePanelId,
        );

    const nextLayout =
        insertPanelAsTab(
            detachedLayout,
            sourcePanelId,
            targetPanelId,
        );

    return {
        layout:
            nextLayout,
    };
}