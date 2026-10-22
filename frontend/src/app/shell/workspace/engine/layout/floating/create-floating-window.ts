import type {
    FloatingWindowModel,
    PanelId,
} from "@model";

import {
    createLayoutNodeId,
} from "../id";

import {
    createPanelNode,
} from "@model";

export function createFloatingWindow(
    panelId: PanelId,
    zIndex: number,
): FloatingWindowModel {
    return {
        id: createLayoutNodeId(),

        root: createPanelNode(panelId),

        x: 120,
        y: 120,

        width: 800,
        height: 600,

        zIndex,
    };
}