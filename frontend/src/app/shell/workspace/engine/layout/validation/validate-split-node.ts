import type { SplitNode } from "../../../model";

export function validateSplitNode(
    node: SplitNode,
): boolean {
    if (
        node.children.length !==
        node.sizes.length
    ) {
        return false;
    }

    const total =
        node.sizes.reduce(
            (sum, size) => sum + size,
            0,
        );

    if (Math.abs(total - 100) > 0.01) {
        return false;
    }

    if (
        node.sizes.some(
            (size) => size <= 0,
        )
    ) {
        return false;
    }

    return true;
}