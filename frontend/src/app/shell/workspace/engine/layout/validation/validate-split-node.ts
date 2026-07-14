import type {
    SplitNode,
} from "../../../model";

import type {
    ValidationIssue,
} from "./validation.types";

export function validateSplitNode(
    node: SplitNode,
): ValidationIssue[] {

    const issues:
        ValidationIssue[] = [];

    if (
        node.children.length === 0
    ) {
        issues.push({

            code:
                "split-empty",

            message:
                "Split node has no children.",

            nodeId:
                node.id,
        });
    }

    if (
        node.children.length !==
        node.sizes.length
    ) {
        issues.push({

            code:
                "split-size-mismatch",

            message:
                "Split size count mismatch.",

            nodeId:
                node.id,
        });
    }

    const total =
        node.sizes.reduce(
            (sum, size) =>
                sum + size,
            0,
        );

    if (
        Math.abs(total - 100) >
        0.01
    ) {
        issues.push({

            code:
                "split-total-invalid",

            message:
                "Split sizes must total 100.",

            nodeId:
                node.id,
        });
    }

    if (
        node.sizes.some(
            size => size <= 0,
        )
    ) {
        issues.push({

            code:
                "split-size-invalid",

            message:
                "Split size must be greater than zero.",

            nodeId:
                node.id,
        });
    }

    return issues;
}