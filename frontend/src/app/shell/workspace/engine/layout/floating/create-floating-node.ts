import type {
    FloatingNode,
    PanelId,
} from "@model";

import {
    createLayoutNodeId,
} from "../id";

export function createFloatingNode(
    panelId: PanelId,
): FloatingNode {

    return {

        type: "floating",

        id:
            createLayoutNodeId(),

        panelId,

        x: 120,
        y: 120,

        width: 800,
        height: 600,
    };
}