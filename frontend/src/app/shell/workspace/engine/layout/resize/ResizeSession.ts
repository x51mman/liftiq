import type {
    RefObject,
} from "react";

import {
    calculateResizeDelta,
} from "./calculate-resize-delta";

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
        minSizes: number[],
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
            minSizes: number[],
        ) => void;

    /*
     * Snapshot of the minimum sizes
     * taken when the resize starts.
     */
    private minSizes:
        number[] = [];

    /*
     * Snapshot of the container size
     * taken when the resize starts.
     */
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
        minSizes: number[],
    ) {

        if (this.dragging) {
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

        if (size <= 0) {
            return;
        }

        /*
         * From this point on the resize
         * session uses only snapshots.
         */

        event.preventDefault();

        this.minSizes =
            [...minSizes];

        this.containerSize =
            size;

        this.lastPosition =
            this.direction ===
                "horizontal"
                ? event.clientX
                : event.clientY;

        this.dragging =
            true;

        /*
         * Prevent text selection while
         * the pointer is being dragged.
         */
        document.body.style.userSelect =
            "none";

        /*
         * Keep the resize cursor active
         * even when the pointer leaves
         * the narrow divider element.
         */
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

        this.minSizes =
            [];

        this.containerSize =
            0;

        this.lastPosition =
            0;
    }

    private handlePointerMove(
        event: PointerEvent,
    ) {

        if (!this.dragging) {
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

        /*
         * IMPORTANT:
         *
         * No DOM measurement happens here.
         *
         * containerSize and minSizes
         * are both snapshots from
         * pointerdown.
         */

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
            this.minSizes,
        );
    }

    private handlePointerUp() {

        this.destroy();
    }
}