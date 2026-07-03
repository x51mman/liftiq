import type {
    TabsNode,
} from "../model/panel-layout.types";

import { panelRegistry }
    from "../registry";

import {
    useWorkspaceStore,
} from "../store";

type Props = {
    node: TabsNode;
};

export function TabsRenderer({
    node,
}: Props) {
    const setActivePanel =
        useWorkspaceStore(
            (state) => state.setActivePanel,
        );

    const ActiveComponent =
        panelRegistry[
        node.activePanelId
        ];

    return (
        <div
            className="
                flex
                h-full
                w-full
                flex-col
                overflow-hidden
            "
        >
            <div
                className="
                    flex
                    h-10
                    shrink-0
                    border-b
                    border-cyan-500/20
                "
            >
                {node.panelIds.map(
                    (panelId) => (
                        <button
                            key={panelId}
                            onClick={() =>
                                setActivePanel(
                                    panelId,
                                )
                            }
                            className={`
                                px-4
                                text-sm
                                ${panelId ===
                                    node.activePanelId
                                    ? "bg-cyan-500/20"
                                    : ""
                                }
                            `}
                        >
                            {panelId}
                        </button>
                    ),
                )}
            </div>

            <div className="flex-1 min-h-0">
                {ActiveComponent
                    ? <ActiveComponent />
                    : null}
            </div>
        </div>
    );
}