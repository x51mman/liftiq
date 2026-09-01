import {
    useEffect,
    useRef,
} from "react";

import type {
    PanelId,
} from "../model";

import {
    registerPanelHeaderElement,
    unregisterPanelHeaderElement,
} from "./panel-header-dom-registry";

type Props = {
    panelId: PanelId;
    children: React.ReactNode;
};

export function TabHeaderItem({
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

        registerPanelHeaderElement(
            panelId,
            element,
        );

        return () => {

            unregisterPanelHeaderElement(
                panelId,
                element,
            );
        };

    }, [
        panelId,
    ]);

    return (
        <div
            ref={ref}
            className="
                flex
                items-center
            "
        >
            {children}
        </div>
    );
}