import type {
    FloatingNode,
} from "../../../model";

import type {
    ValidationIssue,
} from "./validation.types";

export function validateFloatingNode(
    node: FloatingNode,
): ValidationIssue[] {

    const issues:
        ValidationIssue[] = [];

    if (
        node.width <= 0
    ) {
        issues.push({

            code:
                "floating-width-invalid",

            message:
                "Floating width must be positive.",

            nodeId:
                node.id,
        });
    }

    if (
        node.height <= 0
    ) {
        issues.push({

            code:
                "floating-height-invalid",

            message:
                "Floating height must be positive.",

            nodeId:
                node.id,
        });
    }

    return issues;
}