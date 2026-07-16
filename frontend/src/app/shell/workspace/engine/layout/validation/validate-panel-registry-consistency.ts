import type {
    PanelId,
} from "../../../model";

import type {
    ValidationIssue,
} from "./validation.types";

export function validatePanelRegistryConsistency(
    registered: PanelId[],
    layoutPanels: PanelId[],
): ValidationIssue[] {

    const issues:
        ValidationIssue[] = [];

    for (
        const panelId
        of layoutPanels
    ) {
        if (
            !registered.includes(
                panelId,
            )
        ) {
            issues.push({

                code:
                    "layout-panel-missing",

                message:
                    `Layout references missing panel "${panelId}".`,
            });
        }
    }

    for (
        const panelId
        of registered
    ) {
        if (
            !layoutPanels.includes(
                panelId,
            )
        ) {
            issues.push({

                code:
                    "orphan-panel",

                message:
                    `Panel "${panelId}" is not present in layout.`,
            });
        }
    }

    return issues;
}