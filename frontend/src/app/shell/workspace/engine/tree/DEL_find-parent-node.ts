import type {
    LayoutNode,
    SplitNode,
} from "../../model";

export function findParentNode(
    root: LayoutNode,
    childId: string,
): SplitNode | null {

    if (root.type !== "split") {
        return null;
    }

    const directChild =
        root.children.some(
            (child) =>
                child.id === childId,
        );

    if (directChild) {
        return root;
    }

    for (const child of root.children) {

        const found =
            findParentNode(
                child,
                childId,
            );

        if (found) {
            return found;
        }
    }

    return null;
}