import type { SplitNode }
    from "../model/panel-layout.types";

export function validateSplitNode(
    node: SplitNode,
) {
    if (
        node.children.length !==
        node.sizes.length
    ) {
        console.warn(
            "Split children/sizes mismatch:",
            node,
        );
    }

    const total =
        node.sizes.reduce(
            (sum, size) => sum + size,
            0,
        );

    if (Math.abs(total - 100) > 0.01) {
        console.warn(
            "Split sizes must total 100:",
            node,
        );
    }

    if (
        node.sizes.some(
            (size) => size <= 0,
        )
    ) {
        console.warn(
            "Split size <= 0:",
            node,
        );
    }
}