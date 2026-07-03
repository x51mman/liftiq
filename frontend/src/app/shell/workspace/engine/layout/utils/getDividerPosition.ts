export function getDividerPositions(
    sizes: number[],
) {
    const positions: number[] = [];

    let total = 0;

    for (
        let i = 0;
        i < sizes.length - 1;
        i++
    ) {
        total += sizes[i];
        positions.push(total);
    }

    return positions;
}