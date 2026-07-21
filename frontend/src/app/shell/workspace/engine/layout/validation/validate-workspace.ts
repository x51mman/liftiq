import type {
    WorkspaceLayout,
    WorkspacePanel,
} from "@model";

import type {
    ValidationIssue,
    ValidationResult,
} from "./validation.types";

import {
    collectLayoutPanels,
} from "./collect-layout-panels";

import {
    collectRegisteredPanelIds,
} from "./collect-registered-panel-ids";

import {
    validatePanelRegistryConsistency,
} from "./validate-panel-registry-consistency";

export function validateWorkspace(
    layout: WorkspaceLayout,
    panels: WorkspacePanel[],
): ValidationResult {

    const issues:
        ValidationIssue[] = [];

    const layoutPanels =
        collectLayoutPanels(
            layout,
        );

    const registeredPanels =
        collectRegisteredPanelIds(
            panels,
        );

    issues.push(
        ...validatePanelRegistryConsistency(
            registeredPanels,
            layoutPanels,
        ),
    );

    return {

        valid:
            issues.length === 0,

        issues,
    };
}