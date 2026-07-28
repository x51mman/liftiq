import {
    useRef,
    useEffect,
    useCallback,
} from "react";

import type {
    FloatingNode,
} from "../model";

import {
    panelDefinitions,
} from "../registry/panel.definitions";

import {
    useWorkspaceStore,
} from "../store";

import {
    findPanelUnderPointer,
} from "./find-panel-under-pointer";

import {
    getPanelElement,
} from "./panel-dom-registry";

import {
    calculateDockPosition,
} from "./calculate-dock-position";

type Props = {
    node: FloatingNode;
};

export function FloatingWindow({
    node,
}: Props) {

    const showDockPreview =
        useWorkspaceStore(
            state =>
                state.showDockPreview,
        );

    const hideDockPreview =
        useWorkspaceStore(
            state =>
                state.hideDockPreview,
        );

    const moveFloatingWindow =
        useWorkspaceStore(
            state =>
                state.moveFloatingWindow,
        );

    const closeFloatingWindow =
        useWorkspaceStore(
            state =>
                state.closeFloatingWindow,
        );

    const bringFloatingWindowToFront =
        useWorkspaceStore(
            state =>
                state.bringFloatingWindowToFront,
        );

    const dockPanel =
        useWorkspaceStore(
            state =>
                state.dockPanel,
        );

    const definition =
        panelDefinitions[
        node.panelId
        ];

    const dragRef =
        useRef({

            startPointerX: 0,
            startPointerY: 0,

            startX: 0,
            startY: 0,

            isDragging: false,
        });

    const rafRef =
        useRef<number | null>(
            null,
        );

    const nextPositionRef =
        useRef<{
            x: number;
            y: number;
        } | null>(
            null,
        );

    const flushPosition =
        useCallback(() => {

            const nextPosition =
                nextPositionRef.current;

            if (!nextPosition) {
                return;
            }

            moveFloatingWindow(

                node.id,

                nextPosition.x,

                nextPosition.y,
            );

            rafRef.current =
                null;

        }, [
            moveFloatingWindow,
            node.id,
        ]);

    const handlePointerMove =
        useCallback((
            event: PointerEvent,
        ) => {

            if (
                !dragRef.current
                    .isDragging
            ) {
                return;
            }

            const deltaX =
                event.clientX -
                dragRef.current
                    .startPointerX;

            const deltaY =
                event.clientY -
                dragRef.current
                    .startPointerY;

            nextPositionRef.current = {

                x:
                    dragRef.current
                        .startX +
                    deltaX,

                y:
                    dragRef.current
                        .startY +
                    deltaY,
            };

            const targetPanelId =
                findPanelUnderPointer(
                    event.clientX,
                    event.clientY,
                    node.panelId,
                );

            if (!targetPanelId) {

                hideDockPreview();

            } else {

                const targetElement =
                    getPanelElement(
                        targetPanelId,
                    );

                if (!targetElement) {

                    hideDockPreview();

                } else {

                    const rect =
                        targetElement.getBoundingClientRect();

                    const position =
                        calculateDockPosition(
                            rect,
                            event.clientX,
                            event.clientY,
                        );

                    showDockPreview(
                        targetPanelId,
                        position,
                    );
                }
            }

            if (
                rafRef.current ===
                null
            ) {
                rafRef.current =
                    requestAnimationFrame(
                        flushPosition,
                    );
            }

        }, [
            flushPosition,
            hideDockPreview,
            showDockPreview,
            node.panelId,
        ]);

    const handlePointerUp =
        useCallback(() => {

            if (
                !dragRef.current
                    .isDragging
            ) {
                return;
            }

            dragRef.current
                .isDragging = false;

            window.removeEventListener(
                "pointermove",
                handlePointerMove,
            );

            window.removeEventListener(
                "pointerup",
                handlePointerUp,
            );

            if (
                rafRef.current !==
                null
            ) {
                cancelAnimationFrame(
                    rafRef.current,
                );

                rafRef.current =
                    null;
            }

            flushPosition();

            const preview =
                useWorkspaceStore
                    .getState()
                    .dockPreview;

            if (preview) {

                dockPanel(

                    node.panelId,

                    preview.targetPanelId,

                    preview.position,
                );
            }

            hideDockPreview();

            nextPositionRef.current =
                null;

            dragRef.current = {

                startPointerX: 0,
                startPointerY: 0,

                startX: 0,
                startY: 0,

                isDragging: false,
            };

        }, [
            dockPanel,
            flushPosition,
            handlePointerMove,
            hideDockPreview,
            node.panelId,
        ]);

    useEffect(() => {

        return () => {

            window.removeEventListener(
                "pointermove",
                handlePointerMove,
            );

            window.removeEventListener(
                "pointerup",
                handlePointerUp,
            );

            if (
                rafRef.current !==
                null
            ) {
                cancelAnimationFrame(
                    rafRef.current,
                );
            }
        };

    }, [
        handlePointerMove,
        handlePointerUp,
    ]);

    if (!definition) {

        return (
            <div
                className="
                    absolute
                    border
                    rounded-md
                    bg-background
                    p-4
                    text-red-500
                "
            >
                Unknown panel:
                {" "}
                {node.panelId}
            </div>
        );
    }

    const Component =
        definition.component;

    return (

        <div
            className="
                absolute
                flex
                flex-col

                border
                rounded-md

                bg-background
                shadow-lg

                overflow-hidden
            "
            style={{

                left: node.x,

                top: node.y,

                width: node.width,

                height: node.height,
            }}
            onPointerDown={() =>
                bringFloatingWindowToFront(
                    node.id,
                )
            }
        >

            <div
                className="
                    h-10
                    px-3

                    flex
                    items-center
                    justify-between

                    border-b

                    select-none
                    touch-none
                    cursor-move
                "
                onPointerDown={event => {

                    event.currentTarget
                        .setPointerCapture(
                            event.pointerId,
                        );

                    dragRef.current = {

                        startPointerX:
                            event.clientX,

                        startPointerY:
                            event.clientY,

                        startX:
                            node.x,

                        startY:
                            node.y,

                        isDragging:
                            true,
                    };

                    window.addEventListener(
                        "pointermove",
                        handlePointerMove,
                    );

                    window.addEventListener(
                        "pointerup",
                        handlePointerUp,
                    );
                }}
            >

                <span
                    className="
                        text-sm
                        font-medium
                    "
                >
                    {definition.title}
                </span>

                <button
                    onPointerDown={
                        event =>
                            event.stopPropagation()
                    }
                    onClick={() =>
                        closeFloatingWindow(
                            node.id,
                        )
                    }
                    className="
                        px-2
                        rounded
                    "
                    aria-label="Close window"
                >
                    ×
                </button>

            </div>

            <div
                className="
                    flex-1
                    overflow-auto
                "
            >
                <Component />
            </div>

        </div>
    );
}