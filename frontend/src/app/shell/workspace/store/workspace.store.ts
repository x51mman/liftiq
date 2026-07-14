import { create } from "zustand";

import type {
    WorkspaceState,
    WorkspaceId,
    PanelId,
    WorkspaceRestorePayload,
    WorkspaceLayout
} from "../model";

import { defaultLayout, workspaceCatalog } from "../model";
import { defaultPanels } from "../model/factories/default-panels";

import {
    executeFloatPanelCommand, executeTabPanelCommand, executeActiveTabCommand,
    executeClosePanelCommand, executeOpenPanelCommand, executeTogglePanelCommand,
    resizeSplitCommand, splitPanelCommand, executeAddPanelCommand,
    executeRestoreWorkspaceCommand,
} from "../engine";

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
        layout: WorkspaceLayout,
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

        layout: defaultLayout,

        setActiveWorkspace: (id) =>
            set({
                activeWorkspaceId: id,
            }),

        setActivePanel: (id) =>
            set({
                activePanelId: id,
            }),

        restoreWorkspace: (
            payload,
        ) =>
            set(
                executeRestoreWorkspaceCommand(
                    payload,
                ),
            ),

        openPanel: (
            panelId,
        ) =>
            set((state) =>
                executeOpenPanelCommand(
                    state,
                    panelId,
                ),
            ),

        closePanel: (
            panelId,
        ) =>
            set((state) =>
                executeClosePanelCommand(
                    state,
                    panelId,
                ),
            ),

        togglePanel: (
            panelId,
        ) =>
            set((state) =>
                executeTogglePanelCommand(
                    state,
                    panelId,
                ),
            ),

        setLayout: (layout) =>
            set({
                layout: layout,
            }),

        tabPanel: (
            sourcePanelId,
            targetPanelId,
        ) =>
            set((state) => {

                const result =
                    executeTabPanelCommand(
                        state.layout.root,
                        sourcePanelId,
                        targetPanelId,
                    );

                return {

                    layout: {

                        ...state.layout,

                        root:
                            result.layout,
                    },
                };
            }),

        floatPanel: (
            panelId,
        ) =>
            set((state) => {

                const result =
                    executeFloatPanelCommand(
                        state.layout,
                        panelId,
                    );

                return {

                    layout:
                        result.layout,
                };
            }),

        resizeSplit:
            (
                splitId,
                index,
                delta,
            ) =>
                set((state) => {

                    if (!state.layout.root) {
                        return state;
                    }

                    return {
                        layout: {
                            ...state.layout,
                            root: resizeSplitCommand(
                                state.layout.root,
                                splitId,
                                index,
                                delta,
                            ),
                        },
                    };

                }),

        splitPanel: (
            targetPanelId,
            newPanelId,
            direction,
        ) =>
            set((state) => {

                if (!state.layout.root) {
                    return state;
                }

                const result =
                    splitPanelCommand({

                        layout:
                            state.layout.root,

                        panels:
                            state.panels,

                        targetPanelId,

                        newPanelId,

                        direction,
                    });

                return {
                    layout: {
                        ...state.layout,
                        root: result.layout,
                    },
                    panels: result.panels,
                };
            }),

        addPanel: (
            panelId,
        ) =>
            set((state) =>
                executeAddPanelCommand(
                    state,
                    panelId,
                ),
            ),

        activeTab: (
            tabsId,
            panelId,
        ) =>
            set((state) => {

                const result =
                    executeActiveTabCommand(
                        state.layout,
                        tabsId,
                        panelId,
                    );

                return {

                    layout:
                        result.layout,

                    activePanelId:
                        panelId,
                };
            }),

    }));
