import type {
    PanelId,
} from "./workspace.types";

export function createPanelNode(
    panelId: PanelId,
) {
    return {
        type: "panel" as const,
        id: `${panelId}-root`,
        panelId,
    };
}