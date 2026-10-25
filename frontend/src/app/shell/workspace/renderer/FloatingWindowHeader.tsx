import {
    useCallback,
    useEffect,
    useRef,
} from "react";

import type { PointerEvent as ReactPointerEvent } from "react";

type Props = {
    isSimpleWindow: boolean;
    isVisible: boolean;
    onShow: () => void;
    onHide: () => void;
    onPointerDown: (
        event: ReactPointerEvent<HTMLDivElement>,
    ) => void;
    onClose: () => void;
};

const HIDE_DELAY_MS = 400;

export function FloatingWindowHeader({
    isSimpleWindow,
    isVisible,
    onShow,
    onHide,
    onPointerDown,
    onClose,
}: Props) {
    const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const cancelHideTimeout = useCallback(() => {
        if (hideTimeoutRef.current !== null) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }
    }, []);

    const scheduleHide = useCallback(() => {
        cancelHideTimeout();

        hideTimeoutRef.current = setTimeout(() => {
            hideTimeoutRef.current = null;
            onHide();
        }, HIDE_DELAY_MS);
    }, [cancelHideTimeout, onHide]);

    const handlePointerEnter = useCallback(() => {
        cancelHideTimeout();
        onShow();
    }, [cancelHideTimeout, onShow]);

    const handlePointerLeave = useCallback(() => {
        scheduleHide();
    }, [scheduleHide]);

    useEffect(() => {
        return () => {
            cancelHideTimeout();
        };
    }, [cancelHideTimeout]);

    return (
        <div
            className={`
            absolute
            inset-x-0
            top-0
            z-50
            flex
            h-8
            items-center
            justify-between
            border-b
            border-cyan-400/20
            bg-slate-950/90
            px-3
            backdrop-blur-md
            transition-opacity
            duration-200
            ${isVisible
                    ? "pointer-events-auto opacity-100"
                    : "pointer-events-none opacity-0"
                }
        `}
            onPointerDown={onPointerDown}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={handlePointerLeave}
        >
            <div className="flex min-w-0 flex-1 items-center gap-2">
                <span
                    className="
                    h-1.5
                    w-1.5
                    shrink-0
                    rounded-full
                    bg-cyan-400
                    shadow-[0_0_8px_rgba(34,211,238,0.8)]
                "
                />

                <span
                    className="
                    select-none
                    truncate
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.18em]
                    text-cyan-100/80
                "
                >
                    {isSimpleWindow
                        ? "Floating Panel"
                        : "Floating Workspace"}
                </span>
            </div>

            <button
                type="button"
                aria-label="Close floating window"
                title="Close window"
                className="
                ml-3
                flex
                h-5
                w-5
                shrink-0
                items-center
                justify-center
                rounded
                text-slate-400
                transition-colors
                hover:bg-red-500/20
                hover:text-red-300
            "
                onPointerDown={(event) => {
                    event.stopPropagation();
                }}
                onClick={(event) => {
                    event.stopPropagation();
                    onClose();
                }}
            >
                ×
            </button>
        </div>
    );

}
