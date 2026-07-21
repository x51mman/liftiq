import type {
    WorkspaceState,
} from "@model";

export function executeHideDockPreviewCommand(
    // state: WorkspaceState,
): Partial<WorkspaceState> {

    return {

        dockPreview: null,
    };
}