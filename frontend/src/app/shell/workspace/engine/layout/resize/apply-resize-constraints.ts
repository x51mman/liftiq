type ResizeConstraints = {
    sizes: number[];

    index: number;

    delta: number;

    minSizes: number[];

    containerSize: number;
};

export function applyResizeConstraints({
    sizes,
    index,
    delta,
    minSizes,
    containerSize,
}: ResizeConstraints): number[] {

    if (
        containerSize <= 0 ||
        sizes.length === 0
    ) {
        return sizes;
    }

    if (
        index < 0 ||
        index >= sizes.length - 1
    ) {
        return sizes;
    }

    const next =
        [...sizes];

    /*
     * A divider előtti teljes tartomány.
     *
     * Például:
     *
     * A | B | C | D
     *       ^
     *
     * index = 1
     *
     * left  = A + B
     * right = C + D
     */

    const leftIndexes =
        Array.from(
            {
                length:
                    index + 1,
            },
            (_, i) => i,
        );

    const rightIndexes =
        Array.from(
            {
                length:
                    sizes.length -
                    index -
                    1,
            },
            (_, i) =>
                index + 1 + i,
        );

    const leftCurrent =
        leftIndexes.reduce(
            (
                total,
                childIndex,
            ) =>
                total +
                (sizes[childIndex] ?? 0),
            0,
        );

    const rightCurrent =
        rightIndexes.reduce(
            (
                total,
                childIndex,
            ) =>
                total +
                (sizes[childIndex] ?? 0),
            0,
        );

    /*
     * Minimumok százalékban.
     */

    const minPercent =
        minSizes.map(
            minSize =>
                (
                    minSize /
                    containerSize
                ) * 100,
        );

    const leftMinimum =
        leftIndexes.reduce(
            (
                total,
                childIndex,
            ) =>
                total +
                (minPercent[
                    childIndex
                ] ?? 0),
            0,
        );

    const rightMinimum =
        rightIndexes.reduce(
            (
                total,
                childIndex,
            ) =>
                total +
                (minPercent[
                    childIndex
                ] ?? 0),
            0,
        );

    /*
     * A divider bal oldalának
     * új mérete.
     */

    let nextLeft =
        leftCurrent +
        delta;

    /*
     * Minimum.
     */

    nextLeft =
        Math.max(
            leftMinimum,
            nextLeft,
        );

    /*
     * Maximum:
     *
     * a jobb oldalnak is maradnia
     * kell a saját minimumára.
     */

    const total =
        leftCurrent +
        rightCurrent;

    const maximumLeft =
        total -
        rightMinimum;

    nextLeft =
        Math.min(
            maximumLeft,
            nextLeft,
        );

    /*
     * Tényleges változás.
     */

    const actualDelta =
        nextLeft -
        leftCurrent;

    if (
        Math.abs(actualDelta) <
        0.000001
    ) {
        return sizes;
    }

    /*
     * A bal oldali childok
     * között osztjuk el a változást.
     */

    const leftTotal =
        leftCurrent;

    if (leftTotal > 0) {

        for (
            const childIndex
            of leftIndexes
        ) {

            const ratio =
                (
                    sizes[
                    childIndex
                    ] ?? 0
                ) /
                leftTotal;

            next[
                childIndex
            ] =
                (
                    sizes[
                    childIndex
                    ] ?? 0
                ) +
                actualDelta *
                ratio;
        }
    }

    /*
     * A jobb oldali childokból
     * ugyanilyen arányban veszünk el,
     * vagy adunk hozzá.
     */

    const rightTotal =
        rightCurrent;

    if (rightTotal > 0) {

        for (
            const childIndex
            of rightIndexes
        ) {

            const ratio =
                (
                    sizes[
                    childIndex
                    ] ?? 0
                ) /
                rightTotal;

            next[
                childIndex
            ] =
                (
                    sizes[
                    childIndex
                    ] ?? 0
                ) -
                actualDelta *
                ratio;
        }
    }

    return next;
}