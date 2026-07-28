import type {
    WorkspacePanel,
} from "../workspace.types";

import {
    createWorkspacePanel,
} from "./create-workspace-panel";

export function createDefaultPanels():
    WorkspacePanel[] {

    return [
        createWorkspacePanel(
            "dashboard-main",
        ),
    ];
}