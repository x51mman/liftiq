import type {
    PanelId,
} from "../model";

const panelHeaderElements =
    new Map<PanelId, HTMLElement>();

export function registerPanelHeaderElement(
    panelId: PanelId,
    element: HTMLElement,
): void {
    panelHeaderElements.set(
        panelId,
        element,
    );
}

export function unregisterPanelHeaderElement(
    panelId: PanelId,
): void {
    panelHeaderElements.delete(panelId);
}

export function getPanelHeaderElement(
    panelId: PanelId,
): HTMLElement | null {
    return (
        panelHeaderElements.get(panelId)
        ?? null
    );
}