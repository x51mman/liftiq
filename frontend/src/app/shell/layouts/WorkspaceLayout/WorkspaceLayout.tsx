import type { WorkspaceLayoutProps } from "./WorkspaceLayout.types";

import {
    Topbar,
    Sidebar,
    Workspace,
    Statusbar,
} from "../../region"

export function WorkspaceLayout({
    children,
}: WorkspaceLayoutProps) {
    return (
        <div className="flex h-screen flex-col">

            <Topbar />

            <div className="flex flex-1 overflow-hidden">

                <Sidebar />

                <Workspace>
                    {children}
                </Workspace>

            </div>

            <Statusbar />

        </div>
    );
}