import type {
    LayoutNode,
    PanelId,
    SplitNode,
    WorkspaceLayout,
    FloatingWindowModel,
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
            for (const child of node.children) {
                collectPanels(child, result);
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
            return node.panelIds.includes(panelId)
                ? parent
                : null;

        case "split":
            for (const child of node.children) {
                const found = findPanelParentSplit(
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
    const panels = collectPanels(node);

    return (
        panels.find(
            panelId => panelId !== excludedPanelId,
        ) ?? null
    );
}

function findPanelInTabs(
    node: LayoutNode,
    panelId: PanelId,
): PanelId | null {
    switch (node.type) {
        case "panel":
            return null;

        case "tabs": {
            if (!node.panelIds.includes(panelId)) {
                return null;
            }

            const index = node.panelIds.indexOf(panelId);

            // Először a következő, majd az előző tab.
            return (
                node.panelIds[index + 1] ??
                node.panelIds[index - 1] ??
                null
            );
        }

        case "split":
            for (const child of node.children) {
                const found = findPanelInTabs(
                    child,
                    panelId,
                );

                if (found) {
                    return found;
                }
            }

            return null;
    }
}

function findPanelInWindow(
    window: FloatingWindowModel,
    panelId: PanelId,
): PanelId | null {
    /*
     * 1. Ugyanazon TabsNode másik tabja.
     */
    const tabCandidate = findPanelInTabs(
        window.root,
        panelId,
    );

    if (tabCandidate) {
        return tabCandidate;
    }

    /*
     * 2. A bezárt panel közvetlen Split
     *    környezetének testvére.
     */
    const parentSplit = findPanelParentSplit(
        window.root,
        panelId,
    );

    if (parentSplit) {
        for (
            let index = 0;
            index < parentSplit.children.length;
            index++
        ) {
            const child = parentSplit.children[index];
            const childPanels = collectPanels(child);

            if (!childPanels.includes(panelId)) {
                continue;
            }

            // Következő sibling.
            const nextSibling = parentSplit.children[index + 1];

            if (nextSibling) {
                const candidate = findPanelInNode(
                    nextSibling,
                    panelId,
                );

                if (candidate) {
                    return candidate;
                }
            }

            // Előző sibling.
            const previousSibling = parentSplit.children[index - 1];

            if (previousSibling) {
                const candidate = findPanelInNode(
                    previousSibling,
                    panelId,
                );

                if (candidate) {
                    return candidate;
                }
            }
        }
    }

    /*
     * 3. Bármely másik panel ugyanabban
     *    a lebegő ablakban.
     */
    const windowPanels = collectPanels(
        window.root,
    ).filter(
        candidatePanelId =>
            candidatePanelId !== panelId,
    );

    return windowPanels[0] ?? null;
}

export function findFocusCandidate(
    layout: WorkspaceLayout,
    closingPanelId: PanelId,
): PanelId | null {
    /*
     * 1–3. Először abban az ablakban keresünk,
     * amelyik a bezárandó panelt tartalmazza.
     */
    const sourceWindow = layout.floating.find(
        window =>
            collectPanels(window.root).includes(
                closingPanelId,
            ),
    );

    if (sourceWindow) {
        const candidate = findPanelInWindow(
            sourceWindow,
            closingPanelId,
        );

        if (candidate) {
            return candidate;
        }
    }

    /*
     * 4. Floating fallback.
     *
     * Ha a bezárt panel ablakában nincs több
     * panel, a legmagasabb z-indexű másik
     * ablak első panelje kapja a fókuszt.
     */
    const otherWindows = layout.floating
        .filter(
            window =>
                window.id !== sourceWindow?.id,
        )
        .sort(
            (a, b) => b.zIndex - a.zIndex,
        );

    for (const window of otherWindows) {
        const candidate = collectPanels(
            window.root,
        ).find(
            panelId => panelId !== closingPanelId,
        );

        if (candidate) {
            return candidate;
        }
    }

    /*
     * 5. Nincs több panel.
     */
    return null;
}