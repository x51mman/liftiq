import type {
    FloatingNode,
} from "@model";

export function getNextFloatingZIndex(
    floating: FloatingNode[],
): number {

    const maxZIndex =
        floating.reduce(
            (
                maximum,
                node,
            ) =>
                Math.max(
                    maximum,
                    node.zIndex,
                ),
            0,
        );

    return maxZIndex + 1;
}