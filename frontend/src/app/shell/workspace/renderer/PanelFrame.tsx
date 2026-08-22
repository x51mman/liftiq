import {
    PanelHeader,
} from "./PanelHeader";

import {
    useWorkspaceStore,
} from "../store";

import type {
    PanelId,
} from "../model";

type Props = {

    panelId: PanelId;

    children:
    React.ReactNode;

    showHeader?: boolean;

    onUndock?: () => void;

    onClose?: () => void;

    onFocus?: () => void;

    onHeaderPointerDown?: (
        event: React.PointerEvent<HTMLDivElement>,
    ) => void;
};

export function PanelFrame({
    panelId,
    children,
    showHeader = true,
    onUndock,
    onClose,
    onFocus,
    onHeaderPointerDown,
}: Props) {

    const activePanelId =
        useWorkspaceStore(
            state =>
                state.activePanelId,
        );

    const focusPanel =
        useWorkspaceStore(
            state =>
                state.focusPanel,
        );

    const isFocused =
        activePanelId ===
        panelId;

    const handleFocus =
        () => {

            focusPanel(
                panelId,
            );

            onFocus?.();
        };

    return (

        <div
            onPointerDown={
                handleFocus
            }
            className={`
                flex
                h-full
                w-full
                flex-col
                overflow-hidden

                transition-[border,box-shadow,background-color]
                duration-150

                ${isFocused
                    ? `
                            border
                            border-cyan-400/70
                            shadow-[0_0_14px_rgba(34,211,238,0.18)]
                        `
                    : `
                            border
                            border-cyan-500/10
                        `
                }
            `}
        >

            {showHeader && (

                <PanelHeader
                    panelId={panelId}

                    isFocused={isFocused}

                    onUndock={onUndock}

                    onClose={onClose}

                    onPointerDown={onHeaderPointerDown}
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