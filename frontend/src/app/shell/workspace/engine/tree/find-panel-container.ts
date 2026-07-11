import type {
    LayoutNode,
    PanelId,
    PanelNode,
    TabsNode,
} from "../../model";

export type PanelContainer =
    | PanelNode
    | TabsNode;

export function findPanelContainer(
    node: LayoutNode,
    panelId: PanelId,
): PanelContainer | null {

    switch (node.type) {

        case "panel":

            return node.panelId === panelId
                ? node
                : null;

        case "tabs":

            return node.panelIds.includes(
                panelId,
            )
                ? node
                : null;

        case "split":

            for (const child of node.children) {

                const found =
                    findPanelContainer(
                        child,
                        panelId,
                    );

                if (found) {
                    return found;
                }
            }

            return null;

        default:
            return null;
    }
}