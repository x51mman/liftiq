import type {
    PanelId,
    WorkspacePanel,
} from "@model";

export function collectRegisteredPanelIds(
    panels: WorkspacePanel[],
): PanelId[] {

    return panels.map(
        panel => panel.id,
    );
}