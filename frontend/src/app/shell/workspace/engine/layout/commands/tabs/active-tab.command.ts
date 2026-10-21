import type {
    PanelId,
    WorkspaceLayout,
} from "@model";

import {
    updateTabsNode,
} from "@tree";

type Result = {
    layout: WorkspaceLayout;
};

export function executeActiveTabCommand(
    layout: WorkspaceLayout,
    tabsId: string,
    panelId: PanelId,
): Result {
    let tabsFound = false;

    const floating = layout.floating.map(window => {
        const nextRoot = updateTabsNode(
            window.root,
            tabsId,
            node => {
                tabsFound = true;

                /*
                 * Csak akkor aktiváljuk a panelt,
                 * ha valóban ehhez a tabs konténerhez tartozik.
                 */
                if (!node.panelIds.includes(panelId)) {
                    return node;
                }

                return {
                    ...node,
                    activePanelId: panelId,
                };
            },
        );

        return nextRoot === window.root
            ? window
            : {
                ...window,
                root: nextRoot,
            };
    });

    /*
     * Ha nem találtuk meg a tabs konténert,
     * az eredeti layoutot adjuk vissza.
     */
    if (!tabsFound) {
        return { layout };
    }

    return {
        layout: {
            ...layout,
            floating,
        },
    };

}
