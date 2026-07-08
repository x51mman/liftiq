import type {
    LayoutNode,
} from "../../model";

export function collapseSingleChildSplit(
    node: LayoutNode,
): LayoutNode {

    switch (node.type) {

        case "panel":
        case "tabs":
            return node;

        case "split": {

            const children =
                node.children.map(
                    collapseSingleChildSplit,
                );

            if (
                children.length === 1
            ) {
                return children[0];
            }

            return {
                ...node,
                children,
            };
        }

        default:
            return node;

    }
}