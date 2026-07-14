import type {
    LayoutNode,
} from "../../../model";

export function collectNodeIds(
    node: LayoutNode,
    ids = new Set<string>(),
): Set<string> {

    ids.add(node.id);

    if (
        node.type === "split"
    ) {
        for (
            const child
            of node.children
        ) {
            collectNodeIds(
                child,
                ids,
            );
        }
    }

    return ids;
}