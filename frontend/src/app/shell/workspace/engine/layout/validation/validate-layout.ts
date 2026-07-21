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

import { collectDuplicateNodeIds } from "./collect-duplicate-node-ids";

import { validateFloatingNode } from "./validate-floating-node";

import { collectLayoutPanels } from "./collect-layout-panels";

import { collectFloatingPanelIds } from "./collect-floating-panel-ids";

export function validateLayout(
    layout: WorkspaceLayout,
): ValidationResult {

    const issues:
        ValidationIssue[] = [];

    const duplicateNodeIds =
        collectDuplicateNodeIds(
            layout.root,
        );

    for (
        const nodeId
        of duplicateNodeIds
    ) {
        issues.push({

            code:
                "duplicate-node-id",

            message:
                `Duplicate node id "${nodeId}".`,

            nodeId,
        });
    }

    visitLayout(
        layout.root,
        node => {

            switch (
            node.type
            ) {

                case "split":

                    issues.push(
                        ...validateSplitNode(
                            node,
                        ),
                    );

                    break;

                case "tabs":

                    issues.push(
                        ...validateTabsNode(
                            node,
                        ),
                    );

                    break;
            }
        },
    );

    for (
        const floatingNode
        of layout.floating
    ) {
        issues.push(
            ...validateFloatingNode(
                floatingNode,
            ),
        );
    }

    const duplicates =
        collectDuplicatePanelIds(
            layout,
        );

    for (
        const panelId
        of duplicates
    ) {
        issues.push({

            code:
                "duplicate-panel",

            message:
                `Panel "${panelId}" appears multiple times.`,
        });
    }

    const layoutPanels =
        collectLayoutPanels(
            layout,
        );

    const floatingPanels =
        collectFloatingPanelIds(
            layout,
        );

    for (
        const panelId
        of floatingPanels
    ) {
        if (
            layoutPanels.includes(
                panelId,
            )
        ) {
            issues.push({

                code:
                    "panel-floating-duplicate",

                message:
                    `Panel "${panelId}" exists both in layout and floating.`,
            });
        }
    }

    return {

        valid:
            issues.length === 0,

        issues,
    };
}