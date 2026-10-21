import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    visitLayout,
} from "@tree";

export function collectDuplicatePanelIds(
    layout: WorkspaceLayout,
): PanelId[] {
    const seen = new Set<PanelId>();
    const duplicates = new Set<PanelId>();

    function register(panelId: PanelId) {
        if (seen.has(panelId)) {
            duplicates.add(panelId);
            return;
        }

        seen.add(panelId);
    }

    /*
     * Minden floating ablak saját layoutfáját
     * megvizsgáljuk.
     *
     * A seen és duplicates halmazok közösek,
     * így a különböző ablakok közötti duplikációkat
     * is felismerjük.
     */
    for (const window of layout.floating) {
        visitLayout(window.root, node => {
            switch (node.type) {
                case "panel":
                    register(node.panelId);
                    break;

                case "tabs":
                    for (const panelId of node.panelIds) {
                        register(panelId);
                    }
                    break;
            }
        });
    }

    return [...duplicates];

}
