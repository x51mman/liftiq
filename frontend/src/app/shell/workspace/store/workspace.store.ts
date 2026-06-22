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

    openPanel(
        id: PanelId,
    ): void;

    closePanel(
        id: PanelId,
    ): void;

    togglePanel(
        id: PanelId,
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
                state: "open",
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

        openPanel: (id) =>
            set((state) => ({
                panels: state.panels.map((panel) =>
                    panel.id === id
                        ? {
                            ...panel,
                            visible: true,
                            state: "open",
                        }
                        : panel,
                ),
            })),

        closePanel: (id) =>
            set((state) => ({
                panels: state.panels.map((panel) =>
                    panel.id === id
                        ? {
                            ...panel,
                            visible: false,
                            state: "closed",
                        }
                        : panel,
                ),
            })),

        togglePanel: (id) =>
            set((state) => ({
                panels: state.panels.map((panel) =>
                    panel.id === id
                        ? {
                            ...panel,
                            visible: !panel.visible,
                            state: panel.visible
                                ? "hidden"
                                : "open",
                        }
                        : panel,
                ),
            })),
    }));