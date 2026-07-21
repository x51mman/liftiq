import {
    useWorkspaceStore,
} from "../store";

import {
    DockPreviewOverlay,
} from "./DockPreviewOverlay";

export function DockPreviewRenderer() {

    const preview =
        useWorkspaceStore(
            state =>
                state.dockPreview,
        );

    if (!preview) {
        return null;
    }

    return (

        <DockPreviewOverlay
            preview={preview}
        />

    );
}