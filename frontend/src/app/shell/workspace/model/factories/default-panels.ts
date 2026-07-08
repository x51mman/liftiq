import type {
    WorkspacePanel,
} from "../workspace.types";

import {
    createWorkspacePanel,
} from "./create-workspace-panel";

export const defaultPanels:
    WorkspacePanel[] = [
        createWorkspacePanel(
            "dashboard-main",
        ),
    ];