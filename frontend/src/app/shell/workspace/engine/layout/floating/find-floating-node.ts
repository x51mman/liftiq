import type {
    FloatingNode,
    WorkspaceLayout,
} from "@model";

export function findFloatingNode(
    layout: WorkspaceLayout,
    nodeId: string,
): FloatingNode | undefined {

    return layout.floating.find(
        node =>
            node.id === nodeId,
    );
}