import type {
    PanelId,
    WorkspaceState,
} from "@model";

export function executeClosePanelCommand(
    state: WorkspaceState,
    panelId: PanelId,
): Pick<
    WorkspaceState,
    "panels" | "activePanelId"
> {

    const panels =
        state.panels.map(panel =>
            panel.id === panelId
                ? {
                    ...panel,
                    state: "closed" as const,
                }
                : panel,
        );

    const activePanelId =
        state.activePanelId === panelId
            ? null
            : state.activePanelId;

    return {
        panels,
        activePanelId,
    };
}