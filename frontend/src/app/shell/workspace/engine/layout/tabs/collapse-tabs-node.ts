import type {
    LayoutNode,
    TabsNode,
} from "../../../model";

import {
    createPanelNode,
} from "../../../model";

export function collapseTabsNode(
    node: TabsNode,
): LayoutNode {

    if (
        node.panelIds.length > 1
    ) {
        return node;
    }

    const panelId =
        node.panelIds[0];

    if (!panelId) {
        return node;
    }

    return createPanelNode(
        panelId,
    );
}