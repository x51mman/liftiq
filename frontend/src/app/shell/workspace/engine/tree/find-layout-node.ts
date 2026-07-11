import type {
    LayoutNode,
} from "../../model";

export function findLayoutNode(
    node: LayoutNode,
    id: string,
): LayoutNode | null {
    if (node.id === id) {
        return node;
    }

    switch (node.type) {
        case "split":
            for (const child of node.children) {
                const found =
                    findLayoutNode(
                        child,
                        id,
                    );

                if (found) {
                    return found;
                }
            }

            return null;

        case "tabs":
            return null;

        case "panel":
            return null;

        default:
            return null;
    }
}