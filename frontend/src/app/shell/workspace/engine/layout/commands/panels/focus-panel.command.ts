import type {
    PanelId,
    WorkspaceState,
} from "@model";

export function executeFocusPanelCommand(
    state: WorkspaceState,
    panelId: PanelId,
): Pick<
    WorkspaceState,
    "activePanelId"
> {

    const panelExists =
        state.panels.some(
            panel =>
                panel.id === panelId &&
                panel.state !== "closed",
        );

    if (!panelExists) {
        return {
            activePanelId:
                state.activePanelId,
        };
    }

    return {
        activePanelId:
            panelId,
    };
}