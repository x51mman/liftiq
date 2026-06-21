import { create } from "zustand";

import type { WorkspaceState, WorkspaceId, PanelId } from "../model/workspace.types";

import { workspaceCatalog } from "../model/workspace.catalog";

interface WorkspaceStore
    extends WorkspaceState {

    setActiveWorkspace(
        id: WorkspaceId,
    ): void;

    setActivePanel(
        id: PanelId | null,
    ): void;
}

export const useWorkspaceStore =
    create<WorkspaceStore>((set) => ({
        activeWorkspaceId: "dashboard",

        activePanelId: null,

        workspaces: workspaceCatalog,

        panels: [
            {
                id: "dashboard-main",
                workspaceId: "dashboard",
                title: "Dashboard Main",
                visible: true,
            },
        ],

        setActiveWorkspace: (id) =>
            set({
                activeWorkspaceId: id,
            }),

        setActivePanel: (id) =>
            set({
                activePanelId: id,
            }),
    }));