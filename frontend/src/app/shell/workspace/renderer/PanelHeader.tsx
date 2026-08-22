import {
    panelDefinitions,
} from "../registry";

import type {
    PanelId,
} from "../model";

type Props = {

    panelId: PanelId;

    isFocused?: boolean;

    onUndock?: () => void;

    onClose?: () => void;

    onPointerDown?: (
        event:
            React.PointerEvent<HTMLDivElement>,
    ) => void;
};

export function PanelHeader({
    panelId,
    isFocused = false,
    onUndock,
    onClose,
    onPointerDown,
}: Props) {

    const definition =
        panelDefinitions[
        panelId
        ];

    if (!definition) {
        return null;
    }

    const Icon =
        definition.icon;

    return (

        <div
            onPointerDown={
                onPointerDown
            }
            className={`
                flex
                h-10
                shrink-0

                items-center
                justify-between

                border-b

                px-3

                select-none

                transition-[border-color,background-color,box-shadow]
                duration-150

                ${isFocused
                    ? `
                            border-cyan-400/60
                            bg-cyan-500/10
                            shadow-[inset_0_-1px_0_rgba(34,211,238,0.35)]
                        `
                    : `
                            border-cyan-500/20
                            bg-background
                        `
                }
            `}
        >

            <div
                className="
                    flex
                    items-center
                    gap-2
                "
            >

                <Icon
                    size={16}
                />

                <span
                    className="
                        text-sm
                    "
                >
                    {
                        definition.title
                    }
                </span>

            </div>

            <div
                className="
                    flex
                    items-center
                    gap-2
                "
            >

                {onUndock && (

                    <button
                        type="button"
                        onPointerDown={
                            event =>
                                event.stopPropagation()
                        }
                        onClick={
                            onUndock
                        }
                        className="
                            rounded
                            px-2
                            text-sm
                            opacity-70
                            transition-opacity
                            hover:opacity-100
                        "
                        title="Undock"
                        aria-label="Undock"
                    >
                        ↗
                    </button>

                )}

                {onClose && (

                    <button
                        type="button"
                        onPointerDown={
                            event =>
                                event.stopPropagation()
                        }
                        onClick={
                            onClose
                        }
                        className="
                            rounded
                            px-2
                            text-sm
                            opacity-70
                            transition-opacity
                            hover:opacity-100
                        "
                        title="Close"
                        aria-label="Close"
                    >
                        ×
                    </button>

                )}

            </div>

        </div>
    );
}