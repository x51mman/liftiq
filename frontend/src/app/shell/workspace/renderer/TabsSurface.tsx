import {
    useEffect,
    useRef,
} from "react";

import {
    registerPanelElement,
    unregisterPanelElement,
} from "./panel-dom-registry";

import type {
    PanelId,
} from "../model";

type Props = {
    panelId: PanelId;
    children: React.ReactNode;
    isFocused: boolean;
};

export function TabsSurface({
    panelId,
    children,
    isFocused,
}: Props) {

    const ref =
        useRef<HTMLDivElement>(
            null,
        );

    useEffect(() => {

        const element =
            ref.current;

        if (!element) {
            return;
        }

        registerPanelElement(
            panelId,
            element,
        );

        return () => {

            unregisterPanelElement(
                panelId,
            );
        };

    }, [
        panelId,
    ]);

    return (
        <div
            ref={ref}
            className={`
                h-full
                w-full

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
            {children}
        </div>
    );
}