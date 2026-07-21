import type {
    PanelId,
    WorkspaceState,
    DockPreviewPosition
} from "@model";

export function executeShowDockPreviewCommand(
    //  state: WorkspaceState,
    targetPanelId: PanelId,
    position: DockPreviewPosition,
): Partial<WorkspaceState> {

    return {

        dockPreview: {

            targetPanelId,

            position,
        },
    };
}