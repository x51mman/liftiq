import type { ShellRootProps } from "./ShellRoot.types";

import {
    GraphicsHost,
    WorkspaceHost,
    OverlayHost,
    NotificationHost,
    ModalHost,
} from "../hosts";

export function ShellRoot({
    children,
}: ShellRootProps) {
    return (
        <div className="relative h-screen w-screen overflow-hidden text-slate-200">

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