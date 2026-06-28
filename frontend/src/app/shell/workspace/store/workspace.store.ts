import { create } from "zustand";

import type {
    WorkspaceState,
    WorkspaceId,
    PanelId,
    WorkspaceRestorePayload,
} from "../model/workspace.types";

import { defaultLayout } from "../model/default-layout";
import { workspaceCatalog } from "../model/workspace.catalog";
import type { LayoutNode } from "../model/panel-layout.types";

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

    restoreWorkspace(
        state: WorkspaceRestorePayload,
    ): void;

    setLayout(
        layout: LayoutNode,
    ): void;

    splitPanel(
        panelId: PanelId,
        direction: "horizontal" | "vertical",
    ): void;

    tabPanel(
        source: PanelId,
        target: PanelId,
    ): void;

    floatPanel(
        panelId: PanelId,
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
                state: "open",
            },
        ],

        layoutRoot: defaultLayout,

        setActiveWorkspace: (id) =>
            set({
                activeWorkspaceId: id,
            }),

        setActivePanel: (id) =>
            set({
                activePanelId: id,
            }),

        restoreWorkspace: (state: WorkspaceRestorePayload) =>
            set(() => {
                if ('panels' in state) {
                    return {
                        activeWorkspaceId: state.activeWorkspaceId,
                        activePanelId: state.activePanelId,
                        panels: state.panels,
                        layoutRoot: state.layoutRoot,
                    };
                }

                return {
                    activeWorkspaceId: state.activeWorkspaceId,
                    activePanelId: state.activePanelId,
                    panels: [],
                    layoutRoot: defaultLayout,
                };
            }),

        openPanel: (id) =>
            set((state) => ({
                panels: state.panels.map((panel) =>
                    panel.id === id
                        ? {
                            ...panel,
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
                            state:
                                panel.state === "open"
                                    ? "hidden"
                                    : "open",
                        }
                        : panel,
                ),
            })),

        setLayout: (layout) =>
            set({
                layoutRoot: layout,
            }),

        splitPanel: () => { },

        tabPanel: () => { },

        floatPanel: () => { },

    }));