type ResizeChildrenResult = {
    sizes: number[];
    appliedDelta: number;
};

type ResizeChildrenOptions = {
    sizes: number[];
    minSizes: number[];
    index: number;
    delta: number;
    containerSize: number;
};

export function resizeSplitChildren({
    sizes,
    minSizes,
    index,
    delta,
    containerSize,
}: ResizeChildrenOptions): ResizeChildrenResult {

    const count =
        sizes.length;

    if (
        count < 2 ||
        index < 0 ||
        index >= count - 1 ||
        containerSize <= 0
    ) {
        return {
            sizes: [...sizes],
            appliedDelta: 0,
        };
    }

    /*
     * A layout méretei százalékban vannak,
     * a minimumok viszont pixelben.
     *
     * Ezért a resize számítást pixelben
     * végezzük.
     */
    const pixelSizes =
        sizes.map(
            size =>
                Math.max(0, size) /
                100 *
                containerSize,
        );

    const minimums =
        minSizes.map(
            size =>
                Math.max(0, size),
        );

    /*
     * Ha a minimumtömb rövidebb lenne,
     * a hiányzó elemek minimuma 0.
     */
    while (
        minimums.length < count
    ) {
        minimums.push(0);
    }

    const requestedDeltaPx =
        (
            delta /
            100
        ) *
        containerSize;

    if (
        requestedDeltaPx === 0
    ) {
        return {
            sizes: [...sizes],
            appliedDelta: 0,
        };
    }

    /*
     * Megszámoljuk, hogy a divider két
     * oldalán összesen mennyi hely
     * szabadítható fel a minimumok felett.
     *
     * Bal oldal:
     *   children 0 ... index
     *
     * Jobb oldal:
     *   children index + 1 ... count - 1
     */
    let leftAvailablePx = 0;

    for (
        let i = 0;
        i <= index;
        i++
    ) {
        const current =
            pixelSizes[i] ?? 0;

        const minimum =
            minimums[i] ?? 0;

        leftAvailablePx +=
            Math.max(
                0,
                current - minimum,
            );
    }

    let rightAvailablePx = 0;

    for (
        let i = index + 1;
        i < count;
        i++
    ) {
        const current =
            pixelSizes[i] ?? 0;

        const minimum =
            minimums[i] ?? 0;

        rightAvailablePx +=
            Math.max(
                0,
                current - minimum,
            );
    }

    /*
     * A ténylegesen alkalmazható delta
     * nem lépheti túl annak az oldalnak
     * a teljes kapacitását, amelyiknek
     * zsugorodnia kell.
     */
    let appliedDeltaPx =
        requestedDeltaPx;

    if (
        requestedDeltaPx < 0
    ) {
        appliedDeltaPx =
            -Math.min(
                -requestedDeltaPx,
                leftAvailablePx,
            );
    } else {
        appliedDeltaPx =
            Math.min(
                requestedDeltaPx,
                rightAvailablePx,
            );
    }

    if (
        appliedDeltaPx === 0
    ) {
        return {
            sizes: [...sizes],
            appliedDelta: 0,
        };
    }

    /*
     * Divider balra mozog:
     *
     *   bal oldal  -> zsugorodik
     *   jobb oldal -> ugyanennyivel nő
     *
     * A bal oldali zsugorítást a dividerhez
     * legközelebbi gyermektől kifelé végezzük.
     */
    if (
        appliedDeltaPx < 0
    ) {

        let remaining =
            -appliedDeltaPx;

        for (
            let i = index;
            i >= 0 &&
            remaining > 0;
            i--
        ) {

            const current =
                pixelSizes[i] ?? 0;

            const minimum =
                minimums[i] ?? 0;

            const available =
                Math.max(
                    0,
                    current - minimum,
                );

            const reduction =
                Math.min(
                    available,
                    remaining,
                );

            pixelSizes[i] =
                current -
                reduction;

            remaining -=
                reduction;
        }







        /*
         * A felszabadított helyet a divider
         * jobb oldalán lévő első gyermek kapja.
         *
         * Ez tartja meg az összes gyermek
         * teljes méretét.
         */
        pixelSizes[index + 1] =
            (
                pixelSizes[index + 1] ?? 0
            ) -
            appliedDeltaPx;
    }

    /*
     * Divider jobbra mozog:
     *
     *   jobb oldal -> zsugorodik
     *   bal oldal  -> ugyanennyivel nő
     *
     * A jobb oldali zsugorítást a dividerhez
     * legközelebbi gyermektől kifelé végezzük.
     */
    else {


        let remaining =
            appliedDeltaPx;

        for (
            let i = index + 1;
            i < count &&
            remaining > 0;
            i++
        ) {

            const current =
                pixelSizes[i] ?? 0;

            const minimum =
                minimums[i] ?? 0;

            const available =
                Math.max(
                    0,
                    current - minimum,
                );

            const reduction =
                Math.min(
                    available,
                    remaining,
                );

            pixelSizes[i] =
                current -
                reduction;

            remaining -=
                reduction;
        }





        /*
         * A felszabadított helyet a divider
         * bal oldalán lévő első gyermek kapja.
         */
        pixelSizes[index] =
            (
                pixelSizes[index] ?? 0
            ) +
            appliedDeltaPx;
    }

    /*
     * Visszaalakítás százalékra.
     */
    const nextSizes =
        pixelSizes.map(
            size =>
                (
                    size /
                    containerSize
                ) *
                100,
        );

    /*
     * Lebegőpontos eltérés korrekciója.
     *
     * A százalékok összege mindig pontosan
     * 100 legyen.
     */
    const total =
        nextSizes.reduce(
            (
                sum,
                size,
            ) =>
                sum + size,
            0,
        );

    const correction =
        100 - total;

    if (
        nextSizes.length > 0 &&
        Math.abs(correction) >
        1e-10
    ) {
        nextSizes[
            nextSizes.length - 1
        ] += correction;
    }

    return {
        sizes:
            nextSizes,

        appliedDelta:
            (
                appliedDeltaPx /
                containerSize
            ) *
            100,
    };
}