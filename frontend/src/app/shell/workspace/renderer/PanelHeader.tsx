import {
    panelDefinitions,
} from "../registry";

import type {
    PanelId,
} from "../model";

type Props = {

    panelId: PanelId;

    onUndock?: () => void;

    onClose?: () => void;

    onPointerDown?: (
        event: React.PointerEvent<HTMLDivElement>,
    ) => void;
};

export function PanelHeader({
    panelId,
    onUndock,
    onClose,
    onPointerDown,
}: Props) {

    const definition =
        panelDefinitions[
        panelId
        ];

    const Icon =
        definition.icon;

    return (

        <div
            onPointerDown={
                onPointerDown
            }
            className="
                flex
                h-10
                shrink-0

                items-center
                justify-between

                border-b
                border-cyan-500/20

                bg-background

                px-3

                select-none
            "
        >

            <div
                className="
                    flex
                    items-center
                    gap-2
                "
            >
                <Icon size={16} />

                <span
                    className="
                        text-sm
                    "
                >
                    {definition.title}
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
                        onPointerDown={
                            event =>
                                event.stopPropagation()
                        }
                        onClick={
                            onUndock
                        }
                    >
                        ↗
                    </button>

                )}

                {onClose && (

                    <button
                        onPointerDown={
                            event =>
                                event.stopPropagation()
                        }
                        onClick={
                            onClose
                        }
                    >
                        ×
                    </button>

                )}

            </div>

        </div>

    );
}