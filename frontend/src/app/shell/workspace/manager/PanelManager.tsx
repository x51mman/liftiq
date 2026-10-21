import { useWorkspaceStore } from "../store";
import {
    FloatingRenderer,
    DockPreviewRenderer,
} from "../renderer";

export function PanelManager() {
    const layout = useWorkspaceStore(
        (state) => state.layout,
    );

    if (!layout) {
        return null;
    }

    return (
        <>
            <DockPreviewRenderer />

            <FloatingRenderer
                nodes={layout.floating}
            />
        </>
    );

}
