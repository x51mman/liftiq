import type {
    TabsNode,
} from "@model";

import type {
    ValidationIssue,
} from "./validation.types";

export function validateTabsNode(
    node: TabsNode,
): ValidationIssue[] {

    const issues:
        ValidationIssue[] =
        [];

    if (
        node.panelIds.length === 0
    ) {
        issues.push({

            code:
                "tabs-empty",

            message:
                "Tabs node has no panels.",

            nodeId:
                node.id,
        });
    }

    if (
        !node.panelIds.includes(
            node.activePanelId,
        )
    ) {
        issues.push({

            code:
                "tabs-invalid-active",

            message:
                "Active panel is not part of tabs node.",

            nodeId:
                node.id,
        });
    }

    return issues;
}