import type {
    LayoutNode,
    SplitNode,
} from "../../model";

export function updateSplitSizes(
    root: LayoutNode,
    splitId: string,
    updater: (
        split: SplitNode,
    ) => SplitNode,
): LayoutNode {

    if (root.id === splitId) {
        if (root.type !== "split") {
            return root;
        }

        return updater(root);
    }

    if (root.type === "split") {
        let changed = false;

        const nextChildren =
            root.children.map((child) => {
                const next =
                    updateSplitSizes(
                        child,
                        splitId,
                        updater,
                    );

                if (next !== child) {
                    changed = true;
                }

                return next;
            });

        if (!changed) {
            return root;
        }

        return {
            ...root,
            children: nextChildren,
        };
    }

    return root;
}