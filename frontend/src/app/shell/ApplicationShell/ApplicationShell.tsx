import type { ApplicationShellProps } from "./ApplicationShell.types";

import {
    GraphicsHost,
    WorkspaceHost,
    OverlayHost,
    NotificationHost,
    ModalHost,
} from "../hosts";

export function ApplicationShell({
    children,
}: ApplicationShellProps) {
    return (
        <div className="relative h-screen w-screen overflow-hidden">

            <GraphicsHost />

            <WorkspaceHost>
                {children}
            </WorkspaceHost>

            <OverlayHost />

            <NotificationHost />

            <ModalHost />

        </div>
    );
}