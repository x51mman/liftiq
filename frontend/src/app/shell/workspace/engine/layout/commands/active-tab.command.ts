import type {
    PanelId,
    WorkspaceLayout,
} from "../../../model";

import {
    updateTabsNode,
} from "../../tree";

type Result = {
    layout: WorkspaceLayout;
};

export function executeActiveTabCommand(
    layout: WorkspaceLayout,
    tabsId: string,
    panelId: PanelId,
): Result {

    return {

        layout: {

            ...layout,

            root:
                updateTabsNode(
                    layout.root,
                    tabsId,
                    node => ({

                        ...node,

                        activePanelId:
                            panelId,
                    }),
                ),
        },
    };
}