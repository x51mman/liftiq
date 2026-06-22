import { panelRegistry } from "../registry";

import type {
    WorkspacePanel,
} from "../model";

type Props = {
    panel: WorkspacePanel;
};

export function PanelRenderer({
    panel,
}: Props) {

    const Component =
        panelRegistry[panel.id];

    if (!Component) {
        return null;
    }

    return <Component />;
}