import type {
    LayoutNode,
} from "../model/panel-layout.types";

import { PanelRenderer }
    from "./PanelRenderer";

import { SplitRenderer }
    from "./SplitRenderer";

type Props = {
    node: LayoutNode;
};

export function LayoutRenderer({
    node,
}: Props) {
    switch (node.type) {
        case "panel":
            return (
                <PanelRenderer
                    node={node}
                />
            );

        case "split":
            return (
                <SplitRenderer
                    node={node}
                />
            );

        case "tabs":
            return (
                <div>
                    Tabs TODO
                </div>
            );

        case "floating":
            return (
                <div>
                    Floating TODO
                </div>
            );

        default:
            return null;
    }
}