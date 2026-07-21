import type {
    DockPreviewPosition,
} from "../model/docking-preview.types";

type Rect = {
    left: number;
    top: number;
    width: number;
    height: number;
};

export function calculateDockPreviewRect(
    rect: DOMRect,
    position: DockPreviewPosition,
): Rect {

    switch (position) {

        case "tab":

            return {

                left: rect.left,
                top: rect.top,

                width: rect.width,
                height: rect.height,
            };

        case "left":

            return {

                left: rect.left,
                top: rect.top,

                width: rect.width / 2,
                height: rect.height,
            };

        case "right":

            return {

                left:
                    rect.left +
                    rect.width / 2,

                top: rect.top,

                width:
                    rect.width / 2,

                height:
                    rect.height,
            };

        case "top":

            return {

                left: rect.left,
                top: rect.top,

                width: rect.width,

                height:
                    rect.height / 2,
            };

        case "bottom":

            return {

                left: rect.left,

                top:
                    rect.top +
                    rect.height / 2,

                width:
                    rect.width,

                height:
                    rect.height / 2,
            };
    }
}