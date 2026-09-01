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
    TabsSurface,
} from "./TabsSurface";

import { TabHeaderItem } from "./TabHeaderItem";

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

    const activePanelId =
        useWorkspaceStore(
            state =>
                state.activePanelId,
        );

    const isFocused =
        activePanelId ===
        node.activePanelId;

    const definition =
        panelDefinitions[
        node.activePanelId
        ];

    if (!definition) {
        return null;
    }

    const ActiveComponent =
        definition.component;

    return (

        <TabsSurface
            panelId={
                node.activePanelId
            }
            isFocused={
                isFocused
            }
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

                            <TabHeaderItem
                                key={panelId}
                                panelId={panelId}
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

                                    <Icon
                                        size={16}
                                    />

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
                                        undockPanel(
                                            panelId,
                                        )
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
                                        closePanel(
                                            panelId,
                                        )
                                    }
                                    className="
                                        px-2
                                        text-xs
                                        opacity-60
                                        hover:opacity-100
                                    "
                                    title="Close"
                                    aria-label="Close panel"
                                >
                                    ×
                                </button>

                            </TabHeaderItem>

                        );
                    },
                )}

            </div >

            <div
                className="
                    flex-1
                    min-h-0
                "
                onPointerDown={() =>
                    focusPanel(
                        node.activePanelId,
                    )
                }
            >
                <ActiveComponent />
            </div>

        </TabsSurface >

    );
}