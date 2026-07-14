import type {
    WorkspaceLayout,
} from "../../../model";

import type {
    ValidationResult,
    ValidationIssue,
} from "./validation.types";

import {
    visitLayout,
} from "../../tree";

import {
    validateSplitNode,
} from "./validate-split-node";

import {
    validateTabsNode,
} from "./validate-tabs-node";

import {
    collectDuplicatePanelIds,
} from "./collect-duplicate-panel-ids";

export function validateLayout(
    layout: WorkspaceLayout,
): ValidationResult {

    const issues:
        ValidationIssue[] = [];


    //
    // node checks
    //

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

    return {

        valid:
            issues.length === 0,

        issues,
    };
}