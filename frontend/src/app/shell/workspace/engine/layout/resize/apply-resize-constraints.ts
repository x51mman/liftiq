import {
    MIN_PANEL_SIZE,
    MAX_PANEL_SIZE,
} from "./resize.constants";

type ResizeResult = {
    leftSize: number;
    rightSize: number;
};

export function applyResizeConstraints(
    leftSize: number,
    rightSize: number,
    delta: number,
): ResizeResult {
    const total =
        leftSize + rightSize;

    let nextLeft =
        leftSize + delta;

    nextLeft = Math.max(
        MIN_PANEL_SIZE,
        nextLeft,
    );

    nextLeft = Math.min(
        MAX_PANEL_SIZE,
        nextLeft,
    );

    const nextRight =
        total - nextLeft;

    return {
        leftSize: nextLeft,
        rightSize: nextRight,
    };
}