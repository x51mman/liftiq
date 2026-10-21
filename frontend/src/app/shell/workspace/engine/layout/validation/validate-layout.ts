import type {
    WorkspaceLayout,
} from "@model";

import type {
    ValidationResult,
    ValidationIssue,
} from "./validation.types";

import { visitLayout } from "@tree";

import { validateSplitNode } from "./validate-split-node";
import { validateTabsNode } from "./validate-tabs-node";
import { collectDuplicatePanelIds } from "./collect-duplicate-panel-ids";
import { validateFloatingNode } from "./validate-floating-node";

export function validateLayout(
    layout: WorkspaceLayout,
): ValidationResult {
    const issues: ValidationIssue[] = [];

    /*
     * Minden floating ablak saját layoutfáját
     * bejárjuk, és összegyűjtjük a node-azonosítókat.
     *
     * A duplikációkat a teljes workspace-re
     * vonatkozóan ellenőrizzük.
     */
    const allNodeIds = new Set<string>();
    const duplicateNodeIds = new Set<string>();

    for (const window of layout.floating) {
        visitLayout(window.root, node => {
            if (allNodeIds.has(node.id)) {
                duplicateNodeIds.add(node.id);
            } else {
                allNodeIds.add(node.id);
            }

            switch (node.type) {
                case "split":
                    issues.push(
                        ...validateSplitNode(node),
                    );
                    break;

                case "tabs":
                    issues.push(
                        ...validateTabsNode(node),
                    );
                    break;
            }
        });
    }

    for (const nodeId of duplicateNodeIds) {
        issues.push({
            code: "duplicate-node-id",
            message: `Duplicate node id "${nodeId}".`,
            nodeId,
        });
    }

    /*
     * A floating ablakok saját modelljének ellenőrzése.
     */
    for (const floatingWindow of layout.floating) {
        issues.push(
            ...validateFloatingNode(floatingWindow),
        );
    }

    /*
     * A panelazonosítók duplikációjának ellenőrzése
     * az egész workspace-en.
     */
    const duplicates = collectDuplicatePanelIds(layout);

    for (const panelId of duplicates) {
        issues.push({
            code: "duplicate-panel",
            message: `Panel "${panelId}" appears multiple times.`,
        });
    }

    return {
        valid: issues.length === 0,
        issues,
    };

}
