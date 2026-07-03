type ResizeDeltaParams = {
    pointerDeltaPx: number;
    containerSizePx: number;
};

export function calculateResizeDelta({
    pointerDeltaPx,
    containerSizePx,
}: ResizeDeltaParams): number {
    if (containerSizePx <= 0) {
        return 0;
    }

    return (
        (pointerDeltaPx /
            containerSizePx) *
        100
    );
}