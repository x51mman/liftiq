import type {
    DockPreviewPosition,
} from "../model";

export function calculateDockPosition(
    rect: DOMRect,
    x: number,
    y: number,
): DockPreviewPosition {

    const localX =
        x - rect.left;

    const localY =
        y - rect.top;

    const width =
        rect.width;

    const height =
        rect.height;

    const centerX =
        width * 0.25;

    const centerY =
        height * 0.25;

    const inCenterX =

        localX > centerX &&
        localX < width - centerX;

    const inCenterY =

        localY > centerY &&
        localY < height - centerY;

    if (
        inCenterX &&
        inCenterY
    ) {
        return "tab";
    }

    const leftDistance =
        localX;

    const rightDistance =
        width - localX;

    const topDistance =
        localY;

    const bottomDistance =
        height - localY;

    const minDistance =
        Math.min(

            leftDistance,

            rightDistance,

            topDistance,

            bottomDistance,
        );

    if (
        minDistance ===
        leftDistance
    ) {
        return "left";
    }

    if (
        minDistance ===
        rightDistance
    ) {
        return "right";
    }

    if (
        minDistance ===
        topDistance
    ) {
        return "top";
    }

    return "bottom";
}