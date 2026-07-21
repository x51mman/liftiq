import type {
    PanelId,
} from "./workspace.types";

export interface PanelDragState {

    panelId: PanelId;

    pointerX: number;

    pointerY: number;
}