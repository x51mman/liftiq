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

type SplitDividerProps = {
    splitId: string;
    direction: "horizontal" | "vertical";
    index: number;
    position: number;
    containerRef:
    RefObject<HTMLDivElement | null>;
};

export function SplitDivider({
    splitId,
    direction,
    index,
    position,
    containerRef,
}: SplitDividerProps) {
    const isHorizontal =
        direction === "horizontal";

    const resizeSplit =
        useWorkspaceStore(
            (state) =>
                state.resizeSplit,
        );

    const session =
        useMemo(
            () =>
                new ResizeSession({
                    direction,
                    containerRef,
                    onResize:
                        (
                            deltaPercent,
                        ) =>
                            resizeSplit(
                                splitId,
                                index,
                                deltaPercent,
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

    return (
        <div
            onPointerDown={(event) =>
                session.start(
                    event,
                )
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