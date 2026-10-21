import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    visitLayout,
} from "@tree";

export function collectLayoutPanels(
    layout: WorkspaceLayout,
): PanelId[] {
    const panelIds = new Set<PanelId>();

    for (const window of layout.floating) {
        visitLayout(
            window.root,
            node => {
                switch (node.type) {
                    case "panel":
                        panelIds.add(node.panelId);
                        break;

                    case "tabs":
                        for (const panelId of node.panelIds) {
                            panelIds.add(panelId);
                        }
                        break;

                    case "split":
                        break;
                }
            },
        );
    }

    return [...panelIds];

}
