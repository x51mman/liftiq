import type {
    LayoutNode,
    PanelId,
} from "../../../model";

import {
    replaceLayoutNode,
    removeLayoutNode,
    collapseSingleChildSplit,
    findPanelContainerLocation,
} from "../../tree";

import { createTabsNode } from "../../../model";

import {
    addPanelToTabsNode,
    removePanelFromTabsNode,
    collapseTabsNode,
} from "../tabs";

import {
    isSameTabsContainer,
} from "../tabs";

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

    let nextLayout =
        layout;

    //
    // TARGET
    //

    switch (
    target.container.type
    ) {

        case "panel":

            nextLayout =
                replaceLayoutNode(
                    nextLayout,
                    target.container.id,
                    () =>
                        createTabsNode(
                            [
                                targetPanelId,
                                sourcePanelId,
                            ],
                            sourcePanelId,
                        ),
                );

            break;

        case "tabs":

            nextLayout =
                replaceLayoutNode(
                    nextLayout,
                    target.container.id,
                    (node) => {

                        if (
                            node.type !== "tabs"
                        ) {
                            return node;
                        }

                        return addPanelToTabsNode(
                            node,
                            sourcePanelId,
                        );
                    },
                );

            break;
    }

    //
    // SOURCE
    //

    switch (
    source.container.type
    ) {

        case "panel":

            nextLayout =
                removeLayoutNode(
                    nextLayout,
                    source.container.id,
                );

            break;

        case "tabs":

            nextLayout =
                replaceLayoutNode(
                    nextLayout,
                    source.container.id,
                    (node) => {

                        if (
                            node.type !== "tabs"
                        ) {
                            return node;
                        }

                        return collapseTabsNode(
                            removePanelFromTabsNode(
                                node,
                                sourcePanelId,
                            ),
                        );
                    },
                );

            break;
    }

    nextLayout =
        collapseSingleChildSplit(
            nextLayout,
        );

    return {
        layout:
            nextLayout,
    };
}