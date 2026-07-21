import {
    getRegisteredPanels,
} from "./panel-dom-registry";

import type {
    PanelId,
} from "../model";

export function findPanelAtPoint(
    x: number,
    y: number,
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

        if (

            x >= rect.left &&
            x <= rect.right &&

            y >= rect.top &&
            y <= rect.bottom

        ) {
            return panelId as PanelId;
        }
    }

    return null;
}