import type {
    PanelId,
} from "../model";

const panelElements =
    new Map<
        PanelId,
        HTMLDivElement
    >();

export function registerPanelElement(
    panelId: PanelId,
    element: HTMLDivElement,
) {

    panelElements.set(
        panelId,
        element,
    );
}

export function unregisterPanelElement(
    panelId: PanelId,
) {

    panelElements.delete(
        panelId,
    );
}

export function getPanelElement(
    panelId: PanelId,
) {

    return panelElements.get(
        panelId,
    );
}

export function getRegisteredPanels(): ReadonlyMap<
    PanelId,
    HTMLDivElement
> {
    return panelElements;
}