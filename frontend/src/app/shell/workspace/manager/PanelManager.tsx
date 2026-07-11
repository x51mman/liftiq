import { useWorkspaceStore } from "../store";
import { LayoutRenderer } from "../renderer";

export function PanelManager() {
    const layoutRoot =
        useWorkspaceStore(
            (state) => state.layout,
        );

    if (!layoutRoot) {
        return null;
    }

    return (
        <LayoutRenderer
            node={layoutRoot.root}
        />
    );

}