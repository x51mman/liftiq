import type {
    PanelId,
    TabsNode,
} from "@model";

export function addPanelToTabsNode(
    tabs: TabsNode,
    panelId: PanelId,
): TabsNode {

    if (
        tabs.panelIds.includes(
            panelId,
        )
    ) {
        return tabs;
    }

    return {
        ...tabs,
        panelIds: [
            ...tabs.panelIds,
            panelId,
        ],
        activePanelId:
            panelId,
    };
}