import { useWorkspaceStore } from "../store";
import { LayoutRenderer, FloatingRenderer } from "../renderer";

export function PanelManager() {
    const layout =
        useWorkspaceStore(
            (state) => state.layout,
        );

    if (!layout) {
        return null;
    }

    return (

        <>

            <LayoutRenderer
                node={layout.root}
            />

            <FloatingRenderer
                nodes={
                    layout.floating
                }
            />

        </>

    );

}