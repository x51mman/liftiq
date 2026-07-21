import { panelDefinitions } from "../registry";

import type { PanelId } from "../model";

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