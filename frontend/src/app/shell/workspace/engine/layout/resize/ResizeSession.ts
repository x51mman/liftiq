import type {
    RefObject,
} from "react";

import {
    calculateResizeDelta,
} from "./calculate-resize-delta";

import type {
    ResizeSnapshot,
} from "./resize-snapshot";

type Direction =
    | "horizontal"
    | "vertical";

type ResizeSessionOptions = {
    direction:
    Direction;

    containerRef:
    RefObject<
        HTMLDivElement | null
    >;

    onResize: (
        deltaPercent: number,
        containerSize: number,
        snapshot: ResizeSnapshot,
    ) => void;
};

export class ResizeSession {

    private direction:
        Direction;

    private containerRef:
        RefObject<
            HTMLDivElement | null
        >;

    private onResize:
        (
            deltaPercent: number,
            containerSize: number,
            snapshot: ResizeSnapshot,
        ) => void;

    /*
     * Everything needed during the drag
     * is captured at pointerdown.
     *
     * No DOM measurement is performed
     * during pointermove.
     */
    private snapshot:
        ResizeSnapshot | null =
        null;

    private containerSize =
        0;

    private dragging =
        false;

    private lastPosition =
        0;

    constructor(
        options:
            ResizeSessionOptions,
    ) {

        this.direction =
            options.direction;

        this.containerRef =
            options.containerRef;

        this.onResize =
            options.onResize;

        this.handlePointerMove =
            this.handlePointerMove.bind(
                this,
            );

        this.handlePointerUp =
            this.handlePointerUp.bind(
                this,
            );
    }

    start(
        event: React.PointerEvent,
        snapshot: ResizeSnapshot,
    ) {

        if (
            this.dragging
        ) {
            return;
        }

        const container =
            this.containerRef.current;

        if (!container) {
            return;
        }

        const size =
            this.direction ===
                "horizontal"
                ? container.clientWidth
                : container.clientHeight;

        if (
            size <= 0
        ) {
            return;
        }

        event.preventDefault();

        this.snapshot =
            snapshot;

        this.containerSize =
            size;

        this.lastPosition =
            this.direction ===
                "horizontal"
                ? event.clientX
                : event.clientY;

        this.dragging =
            true;

        document.body.style.userSelect =
            "none";

        document.body.style.cursor =
            this.direction ===
                "horizontal"
                ? "col-resize"
                : "row-resize";

        window.addEventListener(
            "pointermove",
            this.handlePointerMove,
        );

        window.addEventListener(
            "pointerup",
            this.handlePointerUp,
        );
    }

    destroy() {

        window.removeEventListener(
            "pointermove",
            this.handlePointerMove,
        );

        window.removeEventListener(
            "pointerup",
            this.handlePointerUp,
        );

        document.body.style.userSelect =
            "";

        document.body.style.cursor =
            "";

        this.dragging =
            false;

        this.snapshot =
            null;

        this.containerSize =
            0;

        this.lastPosition =
            0;
    }

    private handlePointerMove(
        event: PointerEvent,
    ) {

        if (
            !this.dragging ||
            !this.snapshot
        ) {
            return;
        }

        const current =
            this.direction ===
                "horizontal"
                ? event.clientX
                : event.clientY;

        const diff =
            current -
            this.lastPosition;

        this.lastPosition =
            current;

        const deltaPercent =
            calculateResizeDelta({
                pointerDeltaPx:
                    diff,

                containerSizePx:
                    this.containerSize,
            });

        this.onResize(
            deltaPercent,
            this.containerSize,
            this.snapshot,
        );
    }

    private handlePointerUp() {
        this.destroy();
    }
}