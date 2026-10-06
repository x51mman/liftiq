import {
    useEffect,
    useMemo,
} from "react";

import type {
    RefObject,
} from "react";

import {
    useWorkspaceStore,
} from "../store";

import {
    ResizeSession,
} from "../engine";

import {
    createResizeSnapshot,
} from "../engine/layout/resize/resize-snapshot";

import type {
    SplitNode,
} from "../model/panel-layout.types";

type SplitDividerProps = {
    node: SplitNode;

    splitId: string;

    direction:
    | "horizontal"
    | "vertical";

    index: number;

    position: number;

    containerRef:
    RefObject<
        HTMLDivElement | null
    >;
};

export function SplitDivider({
    node,
    splitId,
    direction,
    index,
    position,
    containerRef,
}: SplitDividerProps) {

    const resizeSplit =
        useWorkspaceStore(
            state =>
                state.resizeSplit,
        );

    const session =
        useMemo(
            () =>
                new ResizeSession({
                    direction,
                    containerRef,

                    onResize: (
                        deltaPercent,
                        containerSize,
                        snapshot,
                    ) =>
                        resizeSplit(
                            splitId,
                            index,
                            deltaPercent,
                            containerSize,
                            snapshot,
                        ),
                }),

            [
                direction,
                containerRef,
                resizeSplit,
                splitId,
                index,
            ],
        );

    useEffect(() => {
        return () =>
            session.destroy();
    }, [session]);

    const isHorizontal =
        direction ===
        "horizontal";

    const handlePointerDown =
        (
            event:
                React.PointerEvent<
                    HTMLDivElement
                >,
        ) => {

            /*
             * IMPORTANT:
             *
             * DOM-dependent minimum sizes
             * are measured exactly once,
             * when the resize starts.
             */
            const snapshot =
                createResizeSnapshot(
                    node,
                );

            session.start(
                event,
                snapshot,
            );
        };

    return (
        <div
            onPointerDown={
                handlePointerDown
            }

            className={
                isHorizontal
                    ? `
                        absolute
                        top-0
                        h-full
                        w-1
                        -translate-x-1/2
                        cursor-col-resize
                        bg-cyan-500/40
                        hover:bg-cyan-400
                        z-50
                        select-none
                        touch-none
                    `
                    : `
                        absolute
                        left-0
                        w-full
                        h-1
                        -translate-y-1/2
                        cursor-row-resize
                        bg-cyan-500/40
                        hover:bg-cyan-400
                        z-50
                        select-none
                        touch-none
                    `
            }

            style={
                isHorizontal
                    ? {
                        left:
                            `${position}%`,
                    }
                    : {
                        top:
                            `${position}%`,
                    }
            }
        />
    );
}