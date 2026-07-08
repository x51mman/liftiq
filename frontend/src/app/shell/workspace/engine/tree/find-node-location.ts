import type {
    LayoutNode,
    SplitNode,
} from "../../model";

export type NodeLocation = {

    node: LayoutNode;

    parent: SplitNode | null;

    index: number | null;
};

export function findNodeLocation(
    root: LayoutNode,
    id: string,
    parent: SplitNode | null = null,
    index: number | null = null,
): NodeLocation | null {

    if (root.id === id) {
        return {
            node: root,
            parent,
            index,
        };
    }

    if (root.type !== "split") {
        return null;
    }

    for (
        let i = 0;
        i < root.children.length;
        i++
    ) {

        const child =
            root.children[i];

        const found =
            findNodeLocation(
                child,
                id,
                root,
                i,
            );

        if (found) {
            return found;
        }
    }

    return null;
}