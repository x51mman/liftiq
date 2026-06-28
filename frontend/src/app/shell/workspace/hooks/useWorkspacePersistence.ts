import {
    useEffect,
    useRef,
} from "react";

import {
    useWorkspaceStore,
} from "../store";

import {
    loadWorkspaceState,
    saveWorkspaceState,
} from "../services/workspace.persistence";

import {
    serializeWorkspace,
    deserializeWorkspace,
} from "../persistence";

export function useWorkspacePersistence() {
    const restored =
        useRef(false);

    const restoreWorkspace =
        useWorkspaceStore(
            (state) =>
                state.restoreWorkspace,
        );

    const activeWorkspaceId =
        useWorkspaceStore(
            (state) =>
                state.activeWorkspaceId,
        );

    const activePanelId =
        useWorkspaceStore(
            (state) =>
                state.activePanelId,
        );

    const panels =
        useWorkspaceStore(
            (state) =>
                state.panels,
        );

    useEffect(() => {
        if (restored.current) return;

        const persisted = loadWorkspaceState();

        if (persisted) {
            const state = deserializeWorkspace(persisted);
            restoreWorkspace(state);
        }

        restored.current = true;
    }, [restoreWorkspace]);

    useEffect(() => {
        if (!restored.current) {
            return;
        }

        const serialized =
            serializeWorkspace();

        saveWorkspaceState(
            serialized,
        );
    }, [
        activeWorkspaceId,
        activePanelId,
        panels,
    ]);
}