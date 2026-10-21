import type {
    FloatingWindowModel,
} from "@model";

export function getNextFloatingZIndex(
    floating: FloatingWindowModel[],
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