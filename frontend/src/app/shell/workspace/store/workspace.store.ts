import { create } from "zustand";

import type {
    WorkspaceState,
    WorkspaceId,
    PanelId,
    WorkspaceRestorePayload,
    LayoutNode
} from "../model";

import { defaultLayout, workspaceCatalog, createWorkspacePanel } from "../model";
import { updateTabsNode } from "../engine";
import { defaultPanels } from "../model/factories/default-panels";
import { resizeSplitCommand, splitPanelCommand } from "../engine";

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

    splitPanel(
        targetPanelId: PanelId,
        newPanelId: PanelId,
        direction: "horizontal" | "vertical",
    ): void;

    addPanel(
        panelId: PanelId,
    ): void;

    activeTab(
        tabsId: string,
        panelId: PanelId,
    ): void;
}

export const useWorkspaceStore =
    create<WorkspaceStore>((set) => ({
        activeWorkspaceId: "dashboard",

        activePanelId: null,

        workspaces: workspaceCatalog,

        panels: defaultPanels,

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
                    panels: defaultPanels,
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

        tabPanel: () => { },

        floatPanel: () => { },

        resizeSplit:
            (
                splitId,
                index,
                delta,
            ) =>
                set((state) => {

                    if (!state.layoutRoot) {
                        return state;
                    }

                    return {

                        layoutRoot:

                            resizeSplitCommand(
                                state.layoutRoot,
                                splitId,
                                index,
                                delta,
                            ),
                    };

                }),

        splitPanel: (
            targetPanelId,
            newPanelId,
            direction,
        ) =>
            set((state) => {

                if (!state.layoutRoot) {
                    return state;
                }

                const result =
                    splitPanelCommand({

                        layout:
                            state.layoutRoot,

                        panels:
                            state.panels,

                        targetPanelId,

                        newPanelId,

                        direction,
                    });

                return {

                    layoutRoot:
                        result.layout,

                    panels:
                        result.panels,
                };
            }),

        addPanel: (panelId) =>
            set((state) => {
                const exists =
                    state.panels.some(
                        (panel) =>
                            panel.id === panelId,
                    );

                if (exists) {
                    return state;
                }

                return {
                    panels: [
                        ...state.panels,
                        createWorkspacePanel(
                            panelId,
                        ),
                    ],
                };
            }),

        activeTab: (
            tabsId,
            panelId,
        ) =>
            set((state) => {

                if (!state.layoutRoot) {
                    return state;
                }

                return {

                    layoutRoot:
                        updateTabsNode(
                            state.layoutRoot,
                            tabsId,

                            node => ({

                                ...node,

                                activePanelId:
                                    panelId,

                            }),
                        ),

                    activePanelId:
                        panelId,
                };

            }),

    }));
