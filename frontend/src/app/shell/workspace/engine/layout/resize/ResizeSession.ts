import type { RefObject } from "react";

type Direction =
    | "horizontal"
    | "vertical";

type ResizeSessionOptions = {
    direction: Direction;
    containerRef:
    RefObject<HTMLDivElement | null>;
    onResize: (
        deltaPercent: number,
    ) => void;
};

export class ResizeSession {
    private direction: Direction;

    private containerRef:
        RefObject<HTMLDivElement | null>;

    private onResize:
        (deltaPercent: number) => void;

    private dragging = false;

    private lastPosition = 0;

    constructor(
        options: ResizeSessionOptions,
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

    start(event: React.PointerEvent) {
        if (this.dragging)
            return;

        this.dragging = true;

        this.lastPosition =
            this.direction ===
                "horizontal"
                ? event.clientX
                : event.clientY;

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

        if (!size) {
            return;
        }

        const deltaPercent =
            (diff / size) * 100;

        this.onResize(
            deltaPercent,
        );
    }

    private handlePointerUp() {
        this.dragging = false;
        this.destroy();
    }
}