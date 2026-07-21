import type {
    PanelId,
    WorkspaceState,
} from "@model";

export function executeOpenPanelCommand(
    state: WorkspaceState,
    panelId: PanelId,
): Pick<
    WorkspaceState,
    "panels"
> {

    return {

        panels:
            state.panels.map(
                panel =>
                    panel.id === panelId
                        ? {
                            ...panel,
                            state: "open" as const,
                        }
                        : panel,
            ),
    };
}