import type {
    LayoutNode,
    PanelId,
    SplitNode,
} from "../../model";

import type {
    WorkspaceLayout,
} from "../../model";

function collectPanels(
    node: LayoutNode,
    result: PanelId[] = [],
): PanelId[] {

    switch (node.type) {

        case "panel":
            result.push(node.panelId);
            break;

        case "tabs":
            result.push(...node.panelIds);
            break;

        case "split":

            for (
                const child
                of node.children
            ) {
                collectPanels(
                    child,
                    result,
                );
            }

            break;
    }

    return result;
}

function findPanelParentSplit(
    node: LayoutNode,
    panelId: PanelId,
    parent: SplitNode | null = null,
): SplitNode | null {

    switch (node.type) {

        case "panel":

            return node.panelId === panelId
                ? parent
                : null;

        case "tabs":

            return node.panelIds.includes(
                panelId,
            )
                ? parent
                : null;

        case "split":

            for (
                const child
                of node.children
            ) {

                const found =
                    findPanelParentSplit(
                        child,
                        panelId,
                        node,
                    );

                if (found) {
                    return found;
                }
            }

            return null;
    }
}

function findPanelInNode(
    node: LayoutNode,
    excludedPanelId: PanelId,
): PanelId | null {

    const panels =
        collectPanels(node);

    return (
        panels.find(
            panelId =>
                panelId !==
                excludedPanelId,
        )
        ?? null
    );
}

export function findFocusCandidate(
    layout: WorkspaceLayout,
    closingPanelId: PanelId,
): PanelId | null {

    /*
     * 1. Ugyanazon TabsNode másik tabja.
     */
    const findInTabs =
        (
            node: LayoutNode,
        ): PanelId | null => {

            switch (node.type) {

                case "panel":
                    return null;

                case "tabs": {

                    if (
                        !node.panelIds.includes(
                            closingPanelId,
                        )
                    ) {
                        return null;
                    }

                    const index =
                        node.panelIds.indexOf(
                            closingPanelId,
                        );

                    /*
                     * Először a következő,
                     * majd az előző tab.
                     */
                    return (
                        node.panelIds[
                        index + 1
                        ]
                        ??
                        node.panelIds[
                        index - 1
                        ]
                        ??
                        null
                    );
                }

                case "split":

                    for (
                        const child
                        of node.children
                    ) {

                        const found =
                            findInTabs(
                                child,
                            );

                        if (found) {
                            return found;
                        }
                    }

                    return null;
            }
        };

    const tabCandidate =
        findInTabs(
            layout.root,
        );

    if (tabCandidate) {
        return tabCandidate;
    }

    /*
     * 2. A bezárt panel közvetlen Split
     *    környezetének testvére.
     */
    const parentSplit =
        findPanelParentSplit(
            layout.root,
            closingPanelId,
        );

    if (parentSplit) {

        for (
            let index = 0;
            index <
            parentSplit.children.length;
            index++
        ) {

            const child =
                parentSplit.children[index];

            const childPanels =
                collectPanels(
                    child,
                );

            if (
                !childPanels.includes(
                    closingPanelId,
                )
            ) {
                continue;
            }

            /*
             * Következő sibling.
             */
            const nextSibling =
                parentSplit.children[
                index + 1
                ];

            if (nextSibling) {

                const candidate =
                    findPanelInNode(
                        nextSibling,
                        closingPanelId,
                    );

                if (candidate) {
                    return candidate;
                }
            }

            /*
             * Előző sibling.
             */
            const previousSibling =
                parentSplit.children[
                index - 1
                ];

            if (previousSibling) {

                const candidate =
                    findPanelInNode(
                        previousSibling,
                        closingPanelId,
                    );

                if (candidate) {
                    return candidate;
                }
            }
        }
    }

    /*
     * 3. Bármely másik dockolt panel.
     */
    const rootPanels =
        collectPanels(
            layout.root,
        ).filter(
            panelId =>
                panelId !==
                closingPanelId,
        );

    if (rootPanels.length > 0) {
        return rootPanels[0];
    }

    /*
     * 4. Floating fallback.
     *
     * A legmagasabb z-indexű floating
     * panel kapja vissza a fókuszt.
     */
    const floatingCandidates =
        layout.floating.filter(
            node =>
                node.panelId !==
                closingPanelId,
        );

    if (
        floatingCandidates.length > 0
    ) {

        const topmost =
            floatingCandidates.reduce(
                (
                    highest,
                    node,
                ) =>
                    node.zIndex >
                        highest.zIndex
                        ? node
                        : highest,
            );

        return topmost.panelId;
    }

    /*
     * 5. Nincs több panel.
     */
    return null;
}