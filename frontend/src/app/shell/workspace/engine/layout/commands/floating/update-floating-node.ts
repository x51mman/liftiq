import type {
    FloatingNode,
    WorkspaceLayout,
} from "@model";

export function updateFloatingNode(
    layout: WorkspaceLayout,
    nodeId: string,
    updater: (
        node: FloatingNode,
    ) => FloatingNode,
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