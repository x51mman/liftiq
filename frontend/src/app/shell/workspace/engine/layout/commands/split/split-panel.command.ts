import type {
    LayoutNode,
    PanelId,
    WorkspacePanel,
} from "@model";

import {
    findPanelContainerLocation,
    replaceLayoutNode,
} from "@tree";

import {
    createPanelNode,
    createWorkspacePanel,
} from "@model";

import {
    createLayoutNodeId,
} from "../../id";

type Params = {
    layout: LayoutNode;
    panels: WorkspacePanel[];
    targetPanelId: PanelId;
    newPanelId: PanelId;
    direction: "horizontal" | "vertical";
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

    /*
     * 1. Megkeressük a célpanel konténerét.
     */
    const location = findPanelContainerLocation(
        layout,
        targetPanelId,
    );

    /*
     * 2. Csak önálló panelt osztunk fel.
     *    Ha a panel tabs konténerben van,
     *    a művelet nem módosít semmit.
     */
    if (
        !location ||
        location.container.type !== "panel"
    ) {
        return {
            layout,
            panels,
        };
    }

    /*
     * 3. Az új panel azonosítója nem
     *    egyezhet meg a célpanelével,
     *    és nem lehet már használatban.
     */
    if (
        newPanelId === targetPanelId ||
        panels.some(
            panel => panel.id === newPanelId,
        )
    ) {
        return {
            layout,
            panels,
        };
    }

    /*
     * 4. Megkeressük a célpanel pontos
     *    LayoutNode azonosítóját.
     */
    const targetNodeId = location.container.id;

    /*
     * 5. A célpanelt SplitNode-dal helyettesítjük.
     */
    const nextLayout = replaceLayoutNode(
        layout,
        targetNodeId,
        (node) => {
            if (node.type !== "panel") {
                return node;
            }

            return {
                type: "split",
                id: createLayoutNodeId(),
                direction,
                sizes: [50, 50],
                children: [
                    node,
                    createPanelNode(newPanelId),
                ],
            };
        },
    );

    /*
     * 6. Ellenőrizzük, hogy a felosztás
     *    ténylegesen létrejött-e.
     */
    const nextLocation = findPanelContainerLocation(
        nextLayout,
        newPanelId,
    );

    if (!nextLocation) {
        return {
            layout,
            panels,
        };
    }

    /*
     * 7. Csak sikeres felosztás után
     *    vesszük fel az új panelt.
     */
    return {
        layout: nextLayout,
        panels: [
            ...panels,
            createWorkspacePanel(newPanelId),
        ],
    };
}
