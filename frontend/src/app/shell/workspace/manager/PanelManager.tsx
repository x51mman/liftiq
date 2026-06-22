import {
    useActiveWorkspacePanels,
} from "../hooks";

import {
    PanelRenderer,
} from "../renderer";

export function PanelManager() {

    const panels =
        useActiveWorkspacePanels();

    return (
        <>
            {panels.map((panel) => (
                <PanelRenderer
                    key={panel.id}
                    panel={panel}
                />
            ))}
        </>
    );
}