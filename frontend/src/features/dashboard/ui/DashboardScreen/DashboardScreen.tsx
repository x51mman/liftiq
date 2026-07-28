import { useEffect } from "react";

import {
    useWorkspaceStore,
} from "@/app/shell/workspace";

export function DashboardScreen() {

    const floatPanel =
        useWorkspaceStore(
            state =>
                state.floatPanel,
        );

    useEffect(() => {

        floatPanel(
            "monitoring-main",
        );

    }, [
        floatPanel,
    ]);

    return (
        <div className="p-6">
            Dashboard v1
        </div>
    );
}