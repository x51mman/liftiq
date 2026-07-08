import { panelDefinitions } from "../registry";

import type { PanelId } from "../model";

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

    return <Component />;
}