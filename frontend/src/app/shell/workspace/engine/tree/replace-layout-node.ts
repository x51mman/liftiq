import type {
    LayoutNode,
} from "../../model";

export function replaceLayoutNode(
    node: LayoutNode,
    targetId: string,
    replacer: (
        node: LayoutNode,
    ) => LayoutNode,
): LayoutNode {
    if (node.id === targetId) {
        return replacer(node);
    }

    switch (node.type) {
        case "split":
            return {
                ...node,
                children:
                    node.children.map(
                        (child) =>
                            replaceLayoutNode(
                                child,
                                targetId,
                                replacer,
                            ),
                    ),
            };

        case "tabs":
        case "panel":
        default:
            return node;
    }
}