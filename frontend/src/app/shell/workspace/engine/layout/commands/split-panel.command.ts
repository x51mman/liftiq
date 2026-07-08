import type {
    LayoutNode,
    PanelId,
    WorkspacePanel,
} from "../../../model";

import {
    replaceLayoutNode,
} from "../../tree";

import {
    createPanelNode,
    createWorkspacePanel,
} from "../../../model";

type Params = {

    layout: LayoutNode;

    panels: WorkspacePanel[];

    targetPanelId: PanelId;

    newPanelId: PanelId;

    direction:
    | "horizontal"
    | "vertical";
};

export type SplitPanelCommandResult = {
    layout: LayoutNode;
    panels: WorkspacePanel[];
};

export function splitPanelCommand({
    layout,
    panels,
    targetPanelId,
    newPanelId,
    direction,
}: Params): SplitPanelCommandResult {

    const nextLayout =
        replaceLayoutNode(
            layout,
            `${targetPanelId}-root`,
            (node) => {

                if (node.type !== "panel") {
                    return node;
                }

                return {

                    type: "split",

                    id:
                        crypto.randomUUID(),

                    direction,

                    sizes: [50, 50],

                    children: [

                        node,

                        createPanelNode(
                            newPanelId,
                        ),
                    ],
                };
            },
        );

    const panelExists =
        panels.some(
            (panel) =>
                panel.id === newPanelId,
        );

    return {

        layout:
            nextLayout,

        panels:
            panelExists
                ? panels
                : [
                    ...panels,
                    createWorkspacePanel(
                        newPanelId,
                    ),
                ],
    };
}