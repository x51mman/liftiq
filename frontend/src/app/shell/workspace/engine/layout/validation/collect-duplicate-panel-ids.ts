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

    const seen =
        new Set<PanelId>();

    const duplicates =
        new Set<PanelId>();

    function register(
        panelId: PanelId,
    ) {
        if (
            seen.has(panelId)
        ) {
            duplicates.add(
                panelId,
            );

            return;
        }

        seen.add(
            panelId,
        );
    }

    visitLayout(
        layout.root,
        node => {

            switch (
            node.type
            ) {

                case "panel":

                    register(
                        node.panelId,
                    );

                    break;

                case "tabs":

                    for (
                        const panelId
                        of node.panelIds
                    ) {
                        register(
                            panelId,
                        );
                    }

                    break;
            }
        },
    );

    for (
        const floating
        of layout.floating
    ) {
        register(
            floating.panelId,
        );
    }

    return [
        ...duplicates,
    ];
}