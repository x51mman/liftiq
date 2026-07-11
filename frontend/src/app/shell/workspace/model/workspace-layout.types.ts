import type {
    FloatingNode,
    LayoutNode,
} from "./panel-layout.types";

export interface WorkspaceLayout {

    root: LayoutNode;

    floating: FloatingNode[];
}