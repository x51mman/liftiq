import type {
    TabsNode,
} from "../model";

import {
    panelDefinitions,
} from "../registry";

import {
    useWorkspaceStore,
} from "../store";

import {
    PanelHost,
} from "./PanelHost";

type Props = {
    node: TabsNode;
};

export function TabsRenderer({
    node,
}: Props) {

    const activeTab =
        useWorkspaceStore(
            (state) =>
                state.activeTab,
        );

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
                    (panelId) => {

                        const definition =
                            panelDefinitions[
                            panelId
                            ];

                        const Icon =
                            definition.icon;

                        return (
                            <button
                                key={panelId}
                                onClick={() =>
                                    activeTab(
                                        node.id,
                                        panelId,
                                    )
                                }
                                className={`
                                    flex
                                    items-center
                                    gap-2
                                    px-4
                                    text-sm

                                    ${panelId ===
                                        node.activePanelId
                                        ? "bg-cyan-500/20"
                                        : ""
                                    }
                                `}
                            >
                                <Icon size={16} />

                                {definition.title}
                            </button>
                        );
                    },
                )}
            </div>

            <div
                className="
                    flex-1
                    min-h-0
                "
            >
                <PanelHost
                    panelId={
                        node.activePanelId
                    }
                />
            </div>
        </div>
    );
}