import { panelRegistry } from "../registry";
import type { PanelNode } from "../model/panel-layout.types";

type Props = {
    node: PanelNode;
};

export function PanelRenderer({
    node,
}: Props) {
    const Component =
        panelRegistry[node.panelId];

    if (!Component) {
        return (
            <div className="p-4 text-red-400">
                Missing panel:
                {node.panelId}
            </div>
        );
    }

    return <Component />;
}