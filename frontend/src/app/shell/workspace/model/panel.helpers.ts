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
            "users",
        )
    ) {
        return "users";
    }

    if (
        panelId.startsWith(
            "elevators",
        )
    ) {
        return "elevators";
    }

    if (
        panelId.startsWith(
            "audit",
        )
    ) {
        return "audit";
    }

    if (
        panelId.startsWith(
            "service",
        )
    ) {
        return "service";
    }

    if (
        panelId.startsWith(
            "settings",
        )
    ) {
        return "settings";
    }

    return "monitoring";
}