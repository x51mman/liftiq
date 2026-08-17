import type {
    PanelId,
} from "../model";

import {
    PanelHeader,
} from "./PanelHeader";

type Props = {

    panelId: PanelId;

    children:
    React.ReactNode;

    showHeader?: boolean;

    onUndock?: () => void;

    onClose?: () => void;
};

export function PanelFrame({
    panelId,
    children,
    showHeader = true,
    onUndock,
    onClose,
}: Props) {

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

            {showHeader && (

                <PanelHeader
                    panelId={panelId}
                    onUndock={onUndock}
                    onClose={onClose}
                />

            )}

            <div
                className="
                    flex-1
                    min-h-0
                    overflow-auto
                "
            >
                {children}
            </div>

        </div>

    );
}