import type {
    PanelId,
} from "./workspace.types";

export type DockPreviewPosition =
    | "tab"
    | "left"
    | "right"
    | "top"
    | "bottom";

export interface DockPreviewState {

    targetPanelId:
    PanelId;

    position:
    DockPreviewPosition;
}