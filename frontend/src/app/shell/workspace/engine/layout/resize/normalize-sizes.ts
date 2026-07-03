export function normalizeSizes(
    sizes: number[],
): number[] {
    const total =
        sizes.reduce(
            (sum, size) =>
                sum + size,
            0,
        );

    if (total === 0) {
        return sizes;
    }

    return sizes.map(
        (size) =>
            (size / total) * 100,
    );
}