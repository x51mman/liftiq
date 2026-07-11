import type {
    PanelId,
} from "../workspace.types";

import type {
    TabsNode,
} from "../panel-layout.types";

import {
    createLayoutNodeId,
} from "../../engine";

export function createTabsNode(
    panelIds: PanelId[],
    activePanelId: PanelId,
): TabsNode {

    return {
        type: "tabs",

        id:
            createLayoutNodeId(),

        panelIds,

        activePanelId,
    };
}