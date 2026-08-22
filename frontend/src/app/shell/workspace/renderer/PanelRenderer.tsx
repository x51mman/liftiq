import {
    panelDefinitions,
} from "../registry/panel.definitions";

import type {
    PanelNode,
} from "../model/panel-layout.types";

import {
    PanelSurface,
} from "./PanelSurface";

import {
    PanelFrame,
} from "./PanelFrame";

import {
    useWorkspaceStore,
} from "../store";

type Props = {
    node: PanelNode;
};

export function PanelRenderer({
    node,
}: Props) {

    const definition =
        panelDefinitions[
        node.panelId
        ];

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

    if (!definition) {

        return (
            <div
                className="
                    p-4
                    text-red-400
                "
            >
                Missing panel:
                {" "}
                {node.panelId}
            </div>
        );
    }

    const Component =
        definition.component;

    return (

        <PanelSurface
            panelId={
                node.panelId
            }
        >

            <PanelFrame
                panelId={node.panelId}

                onUndock={() =>
                    undockPanel(
                        node.panelId,
                    )
                }

                onClose={() =>
                    closePanel(
                        node.panelId,
                    )
                }
            >

                <Component />

            </PanelFrame>

        </PanelSurface>
    );
}