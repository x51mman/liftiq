import type { PanelId } from "./workspace.types";

export interface PanelNode {
    type: "panel";
    id: string;
    panelId: PanelId;
}

export interface TabsNode {
    type: "tabs";
    id: string;
    activePanelId: PanelId;
    panelIds: PanelId[];
}

export interface SplitNode {
    type: "split";
    id: string;
    direction: "horizontal" | "vertical";
    ratio: readonly number[];
    children: readonly LayoutNode[];
}

export interface FloatingNode {
    type: "floating";
    id: string;
    panelId: PanelId;

    x: number;
    y: number;

    width: number;
    height: number;
}

export type LayoutNode =
    | PanelNode
    | TabsNode
    | SplitNode
    | FloatingNode;
