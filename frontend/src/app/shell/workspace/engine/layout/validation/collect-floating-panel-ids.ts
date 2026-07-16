import type {
    PanelId,
    WorkspaceLayout,
} from "../../../model";

export function collectFloatingPanelIds(
    layout: WorkspaceLayout,
): PanelId[] {

    return layout.floating.map(
        node => node.panelId,
    );
}