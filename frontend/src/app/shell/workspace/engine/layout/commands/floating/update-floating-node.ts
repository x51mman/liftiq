import type {
    FloatingWindowModel,
    WorkspaceLayout,
} from "@model";

export function updateFloatingNode(
    layout: WorkspaceLayout,
    nodeId: string,
    updater: (
        node: FloatingWindowModel,
    ) => FloatingWindowModel,
): WorkspaceLayout {

    return {

        ...layout,

        floating:
            layout.floating.map(
                node =>
                    node.id === nodeId
                        ? updater(node)
                        : node,
            ),
    };
}