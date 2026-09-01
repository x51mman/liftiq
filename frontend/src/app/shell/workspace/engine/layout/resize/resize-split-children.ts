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

    const nextSizes =
        sizes.map(
            size =>
                (
                    size / 100
                ) * containerSize,
        );

    if (
        index < 0 ||
        index >=
        nextSizes.length - 1
    ) {
        return {
            sizes,
            appliedDelta: 0,
        };
    }

    /*
     * A divider mozgatása mindig
     * a két oldal közötti helyet
     * osztja újra.
     *
     * delta < 0:
     *
     * bal oldal zsugorodik,
     * jobb oldal nő.
     *
     * delta > 0:
     *
     * jobb oldal zsugorodik,
     * bal oldal nő.
     */

    if (delta < 0) {

        let remaining =
            -delta;

        /*
         * Bal oldal:
         *
         * a dividerhez legközelebbi
         * childtól kifelé zsugorítunk.
         */

        for (
            let i = index;
            i >= 0 &&
            remaining > 0;
            i--
        ) {

            const current =
                nextSizes[i] ?? 0;

            const minimum =
                minSizes[i] ?? 0;

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

            nextSizes[i] =
                current -
                reduction;

            remaining -=
                reduction;
        }

        const appliedDelta =
            -(
                -delta -
                remaining
            );

        /*
         * A jobb oldal teljes
         * rendelkezésre álló mérete
         * ennyivel nő.
         *
         * A legközelebbi jobb child
         * kapja meg a növekedést.
         */

        nextSizes[index + 1] =
            (
                nextSizes[index + 1] ?? 0
            ) -
            appliedDelta;

        return {
            sizes:
                nextSizes.map(
                    size =>
                        (
                            size /
                            containerSize
                        ) * 100,
                ),

            appliedDelta,
        };
    }

    /*
     * delta > 0
     *
     * Jobb oldal zsugorodik,
     * bal oldal nő.
     */

    let remaining =
        delta;

    for (
        let i = index + 1;
        i < nextSizes.length &&
        remaining > 0;
        i++
    ) {

        const current =
            nextSizes[i] ?? 0;

        const minimum =
            minSizes[i] ?? 0;

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

        nextSizes[i] =
            current -
            reduction;

        remaining -=
            reduction;
    }

    const appliedDelta =
        delta -
        remaining;

    nextSizes[index] =
        (
            nextSizes[index] ?? 0
        ) +
        appliedDelta;

    return {
        sizes:
            nextSizes.map(
                size =>
                    (
                        size /
                        containerSize
                    ) * 100,
            ),

        appliedDelta,
    };
}