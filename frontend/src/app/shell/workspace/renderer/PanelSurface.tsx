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

    children:
    React.ReactNode;
};

export function PanelSurface({
    panelId,
    children,
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

    }, [panelId]);

    return (

        <div
            ref={ref}
            className="
                h-full
                w-full
            "
        >
            {children}
        </div>

    );
}