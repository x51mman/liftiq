import type {
    PanelId,
    WorkspaceState,
} from "../../../model";

export function executeActiveTabCommand(
    _state: WorkspaceState,
    panelId: PanelId,
): Pick<
    WorkspaceState,
    "activePanelId"
> {
    return {
        activePanelId: panelId,
    };
}