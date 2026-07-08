import type {
    PanelNode,
} from "../panel-layout.types";

import type {
    PanelId,
} from "../workspace.types";

export function createPanelNode(
    panelId: PanelId,
): PanelNode {
    return {
        type: "panel",

        id:
            `${panelId}-root`,

        panelId,
    };
}