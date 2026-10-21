import type {
    FloatingWindowModel,
    WorkspaceLayout,
} from "@model";

export function findFloatingNode(
    layout: WorkspaceLayout,
    nodeId: string,
): FloatingWindowModel | undefined {

    return layout.floating.find(
        node =>
            node.id === nodeId,
    );
}