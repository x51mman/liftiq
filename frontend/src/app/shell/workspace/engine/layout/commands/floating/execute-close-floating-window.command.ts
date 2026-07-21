import type {
    WorkspaceLayout,
} from "@model";

type Result = {
    layout: WorkspaceLayout;
};

export function executeCloseFloatingWindowCommand(
    layout: WorkspaceLayout,
    nodeId: string,
): Result {

    return {

        layout: {

            ...layout,

            floating:
                layout.floating.filter(
                    node =>
                        node.id !== nodeId,
                ),
        },
    };
}