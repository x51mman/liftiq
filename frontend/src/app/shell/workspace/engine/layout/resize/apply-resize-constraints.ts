type ResizeResult = {
    leftSize: number;
    rightSize: number;
};

const MIN_PANEL_SIZE = 15;
const MAX_PANEL_SIZE = 85;

export function applyResizeConstraints(
    leftSize: number,
    rightSize: number,
    delta: number,
): ResizeResult {
    let nextLeft =
        leftSize + delta;

    let nextRight =
        rightSize - delta;

    if (nextLeft < MIN_PANEL_SIZE) {
        const deficit =
            MIN_PANEL_SIZE -
            nextLeft;

        nextLeft =
            MIN_PANEL_SIZE;

        nextRight -= deficit;
    }

    if (nextRight < MIN_PANEL_SIZE) {
        const deficit =
            MIN_PANEL_SIZE -
            nextRight;

        nextRight =
            MIN_PANEL_SIZE;

        nextLeft -= deficit;
    }

    nextLeft = Math.min(
        MAX_PANEL_SIZE,
        nextLeft,
    );

    nextRight = Math.min(
        MAX_PANEL_SIZE,
        nextRight,
    );

    return {
        leftSize: nextLeft,
        rightSize: nextRight,
    };
}