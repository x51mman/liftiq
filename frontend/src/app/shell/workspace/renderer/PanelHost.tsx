import { panelDefinitions } from "../registry/panel.definitions";

import type { PanelId } from "../model/workspace.types";

import { PanelSurface } from "./PanelSurface";

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

    return (

        <PanelSurface
            panelId={panelId}
        >

            <Component />

        </PanelSurface>
    );
}