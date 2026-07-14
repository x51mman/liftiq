export type ValidationIssue = {

    code: string;

    message: string;

    nodeId?: string;
};

export type ValidationResult = {

    valid: boolean;

    issues: ValidationIssue[];
};