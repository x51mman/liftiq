import type {
    LayoutNode,
    PanelId,
    PanelNode,
    TabsNode,
    SplitNode,
} from "../../model";

export type PanelContainerLocation = {

    container:
    | PanelNode
    | TabsNode;

    parent:
    | SplitNode
    | null;

    index:
    | number
    | null;
};

export function findPanelContainerLocation(
    root: LayoutNode,
    panelId: PanelId,
    parent: SplitNode | null = null,
    index: number | null = null,
): PanelContainerLocation | null {

    switch (root.type) {

        case "panel":

            return root.panelId === panelId
                ? {
                    container: root,
                    parent,
                    index,
                }
                : null;

        case "tabs":

            return root.panelIds.includes(
                panelId,
            )
                ? {
                    container: root,
                    parent,
                    index,
                }
                : null;

        case "split":

            for (
                let i = 0;
                i < root.children.length;
                i++
            ) {
                const found =
                    findPanelContainerLocation(
                        root.children[i],
                        panelId,
                        root,
                        i,
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