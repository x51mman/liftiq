import type {
    PanelId,
    WorkspaceId,
} from "./workspace.types";

export function panelIdToWorkspaceId(
    panelId: PanelId,
): WorkspaceId {
    if (
        panelId.startsWith(
            "dashboard",
        )
    ) {
        return "dashboard";
    }

    if (
        panelId.startsWith(
            "monitoring",
        )
    ) {
        return "monitoring";
    }

    if (
        panelId.startsWith(
            "service",
        )
    ) {
        return "service";
    }

    return "analytics";
}