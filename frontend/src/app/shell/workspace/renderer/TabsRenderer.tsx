import type {
    TabsNode,
} from "../model";

import {
    panelDefinitions,
} from "../registry/panel.definitions";

import {
    useWorkspaceStore,
} from "../store";

import {
    PanelFrame,
} from "./PanelFrame";

type Props = {
    node: TabsNode;
};

export function TabsRenderer({
    node,
}: Props) {

    const activeTab =
        useWorkspaceStore(
            state =>
                state.activeTab,
        );

    const undockPanel =
        useWorkspaceStore(
            state =>
                state.undockPanel,
        );

    const closePanel =
        useWorkspaceStore(
            state =>
                state.closePanel,
        );

    const focusPanel =
        useWorkspaceStore(
            state =>
                state.focusPanel,
        );

    const ActiveComponent =
        panelDefinitions[
            node.activePanelId
        ].component;

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
                    panelId => {

                        const definition =
                            panelDefinitions[
                            panelId
                            ];

                        const Icon =
                            definition.icon;

                        return (

                            <div
                                key={panelId}
                                className="
                                    flex
                                    items-center
                                "
                            >

                                <button
                                    onClick={() => {
                                        activeTab(
                                            node.id,
                                            panelId,
                                        );

                                        focusPanel(
                                            panelId,
                                        );
                                    }}
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

                                    {
                                        definition.title
                                    }
                                </button>



                                <button
                                    onPointerDown={
                                        event =>
                                            event.stopPropagation()
                                    }
                                    onClick={() =>
                                        undockPanel(panelId)
                                    }
                                    className="
                                        px-2
                                        text-xs
                                        opacity-60
                                        hover:opacity-100
                                    "
                                    title="Undock"
                                    aria-label="Undock panel"
                                >
                                    ↗
                                </button>

                                <button
                                    onPointerDown={
                                        event =>
                                            event.stopPropagation()
                                    }
                                    onClick={() =>
                                        closePanel(panelId)
                                    }
                                    className="px-2 text-xs opacity-60 hover:opacity-100"
                                    title="Close"
                                    aria-label="Close panel"
                                >
                                    ×
                                </button>

                            </div>

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

                <PanelFrame
                    panelId={
                        node.activePanelId
                    }
                    showHeader={false}
                >

                    <ActiveComponent />

                </PanelFrame>

            </div>

        </div>

    );
}