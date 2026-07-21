import type {
    PanelId,
    TabsNode,
} from "@model";

export function removePanelFromTabsNode(
    tabs: TabsNode,
    panelId: PanelId,
): TabsNode {

    const panelIds =
        tabs.panelIds.filter(
            id => id !== panelId,
        );

    const activePanelId =
        tabs.activePanelId === panelId
            ? panelIds[0] ??
            tabs.activePanelId
            : tabs.activePanelId;

    return {
        ...tabs,
        panelIds,
        activePanelId,
    };
}