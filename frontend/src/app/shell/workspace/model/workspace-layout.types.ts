import type { LayoutNode } from "./panel-layout.types";

export interface FloatingWindowModel {
    id: string;

    /**
     * Az ablakon belüli teljes panelstruktúra.
     *
     * Egyetlen panel esetén PanelNode.
     * Több panel esetén SplitNode vagy TabsNode,
     * illetve ezek tetszőleges kombinációja.
     */
    root: LayoutNode;

    x: number;
    y: number;

    width: number;
    height: number;

    zIndex: number;
}

export interface WorkspaceLayout {
    floating: FloatingWindowModel[];
}