import type {
    WorkspaceLayout,
} from "@model";

type Result = {
    layout: WorkspaceLayout;
};

export function executeBringFloatingWindowToFrontCommand(
    layout: WorkspaceLayout,
    nodeId: string,
): Result {

    const target =
        layout.floating.find(
            node =>
                node.id === nodeId,
        );

    if (!target) {
        return {
            layout,
        };
    }

    return {

        layout: {

            ...layout,

            floating: [

                ...layout.floating.filter(
                    node =>
                        node.id !== nodeId,
                ),

                target,
            ],
        },
    };
}