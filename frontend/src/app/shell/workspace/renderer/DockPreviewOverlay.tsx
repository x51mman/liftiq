import {
    getPanelElement,
} from "./panel-dom-registry";

import type {
    DockPreviewState,
} from "../model/docking-preview.types";

import {
    calculateDockPreviewRect,
} from "./calculate-dock-preview-rect";

type Props = {
    preview: DockPreviewState;
};

export function DockPreviewOverlay({
    preview,
}: Props) {

    const element =
        getPanelElement(
            preview.targetPanelId,
        );

    if (!element) {
        return null;
    }

    const rect =
        element.getBoundingClientRect();

    const previewRect =
        calculateDockPreviewRect(
            rect,
            preview.position,
        );

    return (

        <div
            className="
                fixed
                pointer-events-none

                border-2
                border-cyan-500

                bg-cyan-500/10
            "
            style={{

                left:
                    previewRect.left,

                top:
                    previewRect.top,

                width:
                    previewRect.width,

                height:
                    previewRect.height,
            }}
        />

    );
}