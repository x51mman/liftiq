import { Topbar, Sidebar, Statusbar, ContentViewport } from "../../regions";

import { panelRegistry } from "../../workspace";

import { useActiveWorkspacePanels } from "../../workspace";

export function WorkspaceEngine() {
    const panels =
        useActiveWorkspacePanels();

    return (
        <div className="relative z-20 flex h-full flex-col">
            <Topbar />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                <ContentViewport>
                    {panels.map((panel) => {
                        const Component =
                            panelRegistry[panel.id];

                        if (!Component) {
                            return null;
                        }

                        return (
                            <Component
                                key={panel.id}
                            />
                        );
                    })}
                </ContentViewport>
            </div>

            <Statusbar />
        </div>
    );
}