import {
    Topbar,
    Sidebar,
    Statusbar,
    ContentViewport,
} from "../../regions";

import { PanelManager } from "../../workspace/manager";
import { useWorkspacePersistence } from "../../workspace/hooks";

export function WorkspaceEngine() {
    useWorkspacePersistence();
    return (
        <div className="relative z-20 flex h-full flex-col">

            <Topbar />

            <div className="flex flex-1 overflow-hidden">

                <Sidebar />

                <ContentViewport>

                    <PanelManager />

                </ContentViewport>

            </div>

            <Statusbar />

        </div>
    );
}