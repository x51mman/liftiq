import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    visitLayout,
} from "@tree";

export function collectFloatingPanelIds(
    layout: WorkspaceLayout,
): PanelId[] {
    const panelIds: PanelId[] = [];

    for (const window of layout.floating) {
        visitLayout(
            window.root,
            node => {
                switch (node.type) {
                    case "panel":
                        panelIds.push(node.panelId);
                        break;

                    case "tabs":
                        panelIds.push(...node.panelIds);
                        break;

                    case "split":
                        break;
                }
            },
        );
    }

    return panelIds;

}
