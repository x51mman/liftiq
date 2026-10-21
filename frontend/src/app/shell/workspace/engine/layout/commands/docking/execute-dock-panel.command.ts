import type {
    PanelId,
    WorkspaceLayout,
    DockPreviewPosition,
} from "@model";

import {
    dockPanelIntoContainer,
} from "../../docking";

import {
    findPanelContainerLocation,
} from "@tree";

type Result = {
    layout: WorkspaceLayout;
};

export function executeDockPanelCommand(
    layout: WorkspaceLayout,
    sourcePanelId: PanelId,
    targetPanelId: PanelId,
    position: DockPreviewPosition,
): Result {
    /*
     * 1. A forrásablak megkeresése.
     */
    const sourceWindow = layout.floating.find(
        window =>
            window.root.type === "panel" &&
            window.root.panelId === sourcePanelId,
    );

    if (!sourceWindow) {
        return { layout };
    }

    /*
     * 2. A célablak megkeresése.
     */
    const targetWindow = layout.floating.find(
        window =>
            findPanelContainerLocation(
                window.root,
                targetPanelId,
            ) !== null,
    );

    if (!targetWindow) {
        return { layout };
    }

    /*
     * 3. Egy ablakot nem dockolunk saját
     *    magába. Ez az önmagába történő
     *    dockolást és tabolást is tiltja.
     */
    if (sourceWindow.id === targetWindow.id) {
        return { layout };
    }

    /*
     * 4. A meglévő beillesztési logika
     *    változatlanul a célablak rootján fut.
     */
    const nextTargetRoot = dockPanelIntoContainer(
        targetWindow.root,
        sourcePanelId,
        targetPanelId,
        position,
    );

    /*
     * 5. Sikertelen beillesztés esetén
     *    mindkét ablak változatlan marad.
     *
     * A célpanel konténerének megléte önmagában
     * még nem garantálja, hogy a művelet sikerült,
     * ezért a visszaadott fát is ellenőrizzük.
     */
    const sourceStillPresent =
        findPanelContainerLocation(
            nextTargetRoot,
            sourcePanelId,
        ) !== null;

    if (!sourceStillPresent) {
        return { layout };
    }

    /*
     * 6. Sikeres dockolás:
     *    - frissítjük a célablak rootját;
     *    - eltávolítjuk a forrásablakot.
     */
    return {
        layout: {
            ...layout,
            floating: layout.floating
                .filter(
                    window =>
                        window.id !== sourceWindow.id,
                )
                .map(window =>
                    window.id === targetWindow.id
                        ? {
                            ...window,
                            root: nextTargetRoot,
                        }
                        : window,
                ),
        },
    };
}