import type {
    PersistedWorkspaceState,
} from "../model/workspace.persistence.types";

const STORAGE_KEY =
    "liftiq.workspace.v1";

export function saveWorkspaceState(
    state: PersistedWorkspaceState,
) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(state),
    );
}

export function loadWorkspaceState():
    PersistedWorkspaceState | null {
    const raw =
        localStorage.getItem(
            STORAGE_KEY,
        );

    if (!raw) {
        return null;
    }

    try {
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function clearWorkspaceState() {
    localStorage.removeItem(
        STORAGE_KEY,
    );
}