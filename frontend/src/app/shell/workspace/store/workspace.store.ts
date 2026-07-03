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
import { updateSplitSizes, normalizeSizes, applyResizeConstraints } from "../engine";

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

    resizeSplit(
        splitId: string,
        index: number,
        delta: number,
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

        resizeSplit: (
            splitId,
            index,
            delta,
        ) =>
            set((state) => {
                if (!state.layoutRoot) {
                    return state;
                }

                const nextLayout =
                    updateSplitSizes(
                        state.layoutRoot,
                        splitId,
                        (split) => {
                            const sizes =
                                [...split.sizes];

                            const left =
                                sizes[index];

                            const right =
                                sizes[index + 1];

                            if (
                                left === undefined ||
                                right === undefined
                            ) {
                                return split;
                            }

                            const resized =
                                applyResizeConstraints(
                                    left,
                                    right,
                                    delta,
                                );

                            sizes[index] =
                                resized.leftSize;

                            sizes[index + 1] =
                                resized.rightSize;

                            return {
                                ...split,
                                sizes:
                                    normalizeSizes(
                                        sizes,
                                    ),
                            };
                        },
                    );

                return {
                    layoutRoot:
                        nextLayout,
                };
            }),

    }));
