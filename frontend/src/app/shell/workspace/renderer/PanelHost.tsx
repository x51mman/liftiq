import { panelDefinitions } from "../registry/panel.definitions";

import type { PanelId } from "../model/workspace.types";

import { PanelSurface } from "./PanelSurface";

import { PanelFrame } from "./PanelFrame";

import { useWorkspaceStore } from "../store";

type Props = {
    panelId: PanelId;
};

export function PanelHost({
    panelId,
}: Props) {

    const Component =
        panelDefinitions[
            panelId
        ]?.component;

    if (!Component) {
        return null;
    }

    const undockPanel =
        useWorkspaceStore(
            state =>
                state.undockPanel,
        );

    return (

        <PanelSurface
            panelId={panelId}
        >

            <PanelFrame
                panelId={panelId}
                onUndock={() =>
                    undockPanel(
                        panelId,
                    )
                }
            >

                <Component />

            </PanelFrame>

        </PanelSurface>
    );
}