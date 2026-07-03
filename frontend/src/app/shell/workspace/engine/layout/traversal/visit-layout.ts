import type {
    LayoutNode,
} from "../../../model";

export function visitLayout(
    node: LayoutNode,
    visitor: (
        node: LayoutNode,
    ) => void,
) {
    visitor(node);

    switch (node.type) {
        case "split":
            for (const child of node.children) {
                visitLayout(
                    child,
                    visitor,
                );
            }
            break;

        case "tabs":
        case "panel":
        case "floating":
            break;
    }
}