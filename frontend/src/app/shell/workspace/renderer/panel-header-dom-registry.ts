import type {
    PanelId,
} from "../model";

const panelHeaderElements =
    new Map<
        PanelId,
        HTMLElement
    >();

export function registerPanelHeaderElement(
    panelId: PanelId,
    element: HTMLElement,
) {
    panelHeaderElements.set(
        panelId,
        element,
    );
}

export function unregisterPanelHeaderElement(
    panelId: PanelId,
    element?: HTMLElement,
) {
    const current =
        panelHeaderElements.get(
            panelId,
        );

    if (
        !current ||
        (
            element &&
            current !== element
        )
    ) {
        return;
    }

    panelHeaderElements.delete(
        panelId,
    );
}

export function getPanelHeaderElement(
    panelId: PanelId,
): HTMLElement | null {

    return (
        panelHeaderElements.get(
            panelId,
        ) ?? null
    );
}