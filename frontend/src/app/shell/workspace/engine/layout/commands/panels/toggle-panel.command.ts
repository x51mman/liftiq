import type {
    PanelId,
    WorkspaceState,
} from "@model";

export function executeTogglePanelCommand(
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

                            state:
                                panel.state === "open"
                                    ? "hidden"
                                    : "open",
                        }
                        : panel,
            ),
    };
}