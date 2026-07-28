import type {
    PanelId,
} from "../model";

import {
    getRegisteredPanels,
} from "./panel-dom-registry";

export function findPanelUnderPointer(
    clientX: number,
    clientY: number,
    excludePanelId?: PanelId,
): PanelId | null {

    for (
        const [
            panelId,
            element,
        ]
        of getRegisteredPanels()

    ) {

        const rect =
            element.getBoundingClientRect();

        const insideX =

            clientX >= rect.left &&
            clientX <= rect.right;

        const insideY =

            clientY >= rect.top &&
            clientY <= rect.bottom;

        if (
            excludePanelId &&
            panelId === excludePanelId
        ) {
            continue;
        }

        if (
            insideX &&
            insideY
        ) {
            return panelId;
        }
    }

    return null;
}