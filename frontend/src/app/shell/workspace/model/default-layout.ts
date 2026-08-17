import type {
    WorkspaceLayout,
} from "./workspace-layout.types";

export const defaultLayout: WorkspaceLayout = {
    root: {
        type: "panel",
        id: "dashboard-root",
        panelId: "dashboard-main",
    },
    floating: [],
};