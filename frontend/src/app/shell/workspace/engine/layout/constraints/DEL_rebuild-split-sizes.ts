export function rebuildSplitSizes(
    childCount: number,
): number[] {

    if (childCount <= 0) {
        return [];
    }

    const size =
        100 / childCount;

    return Array.from(
        { length: childCount },
        () => size,
    );
}