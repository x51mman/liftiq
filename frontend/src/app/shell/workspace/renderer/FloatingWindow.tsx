import {
    useRef,
    useEffect,
    useCallback,
    useState,
} from "react";

import type { PointerEvent as ReactPointerEvent } from "react";
import type { FloatingWindowModel } from "@model";

import { useWorkspaceStore } from "../store";
import { LayoutRenderer } from "./LayoutRenderer";
import { FloatingWindowHeader } from "./FloatingWindowHeader";

import { findPanelUnderPointer } from "./find-panel-under-pointer";
import { getPanelElement } from "./panel-dom-registry";
import { calculateDockPosition } from "./calculate-dock-position";

type Props = {
    node: FloatingWindowModel;
};

type DragState = {
    startPointerX: number;
    startPointerY: number;
    startX: number;
    startY: number;
    isDragging: boolean;
    pointerId: number | null;
};

type DockPreviewKey = {
    targetPanelId: string;
    position: string;
};

const HEADER_EDGE_THRESHOLD = 12;

const INITIAL_DRAG_STATE: DragState = {
    startPointerX: 0,
    startPointerY: 0,
    startX: 0,
    startY: 0,
    isDragging: false,
    pointerId: null,
};

export function FloatingWindow({ node }: Props) {
    const showDockPreview = useWorkspaceStore(
        (state) => state.showDockPreview,
    );

    const hideDockPreview = useWorkspaceStore(
        (state) => state.hideDockPreview,
    );

    const moveFloatingWindow = useWorkspaceStore(
        (state) => state.moveFloatingWindow,
    );

    const closeFloatingWindow = useWorkspaceStore(
        (state) => state.closeFloatingWindow,
    );

    const activateFloatingWindow = useWorkspaceStore(
        (state) => state.activateFloatingWindow,
    );

    const dockPanel = useWorkspaceStore(
        (state) => state.dockPanel,
    );

    const activeWindowId = useWorkspaceStore(
        (state) => state.activeWindowId,
    );

    const isActive = activeWindowId === node.id;

    /*
     * Csak a közvetlenül egyetlen PanelNode-ból álló
     * lebegő ablak dockolható egész ablakos mozgatással.
     *
     * SplitNode és TabsNode esetén nincs célpanel-keresés,
     * dockolási pozíciószámítás vagy előnézet.
     */
    const simplePanelId =
        node.root.type === "panel"
            ? node.root.panelId
            : null;

    const isSimpleWindow = simplePanelId !== null;

    const [isHeaderVisible, setIsHeaderVisible] = useState(false);

    const headerHideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const cancelHeaderHideTimeout = useCallback(() => {
        if (headerHideTimeoutRef.current !== null) {
            clearTimeout(headerHideTimeoutRef.current);
            headerHideTimeoutRef.current = null;
        }
    }, []);

    const showWindowHeader = useCallback(() => {
        cancelHeaderHideTimeout();
        setIsHeaderVisible(true);
    }, [cancelHeaderHideTimeout]);

    const scheduleHeaderHide = useCallback(() => {
        cancelHeaderHideTimeout();

        headerHideTimeoutRef.current = setTimeout(() => {
            headerHideTimeoutRef.current = null;

            if (!dragRef.current.isDragging) {
                setIsHeaderVisible(false);
            }
        }, 400);
    }, [cancelHeaderHideTimeout]);

    const nodeRef = useRef(node);
    const dragRef = useRef<DragState>(INITIAL_DRAG_STATE);

    const windowRef = useRef<HTMLDivElement>(null);

    const rafRef = useRef<number | null>(null);

    const nextPositionRef = useRef<{
        x: number;
        y: number;
    } | null>(null);

    const lastPreviewRef = useRef<DockPreviewKey | null>(null);

    useEffect(() => {
        nodeRef.current = node;
    }, [node]);

    /*
     * A drag közben érkező pozícióváltozásokat egyetlen
     * pozíciófrissítésbe vonjuk össze frame-enként.
     */
    const flushPosition = useCallback(() => {
        const nextPosition = nextPositionRef.current;

        if (!nextPosition) {
            rafRef.current = null;
            return;
        }

        moveFloatingWindow(
            nodeRef.current.id,
            nextPosition.x,
            nextPosition.y,
        );

        nextPositionRef.current = null;
        rafRef.current = null;
    }, [moveFloatingWindow]);

    const clearDockPreview = useCallback(() => {
        lastPreviewRef.current = null;
        hideDockPreview();
    }, [hideDockPreview]);

    /*
     * A függvény stabil referenciájú eseménykezelő.
     *
     * Összetett ablaknál a pozíciófrissítés előkészítése
     * után azonnal visszatérünk: a dockolási logika
     * egyáltalán nem fut le.
     */
    const handlePointerMove = useCallback(
        (event: PointerEvent) => {
            const drag = dragRef.current;

            if (
                !drag.isDragging ||
                drag.pointerId !== event.pointerId
            ) {
                return;
            }

            const deltaX = event.clientX - drag.startPointerX;
            const deltaY = event.clientY - drag.startPointerY;

            nextPositionRef.current = {
                x: drag.startX + deltaX,
                y: drag.startY + deltaY,
            };

            if (rafRef.current === null) {
                rafRef.current = requestAnimationFrame(flushPosition);
            }

            // Összetett ablak: kizárólag mozgatás.
            if (!isSimpleWindow || simplePanelId === null) {
                return;
            }

            // Az egyszerű ablak saját paneljét kizárjuk a célok közül.
            const targetPanelId = findPanelUnderPointer(
                event.clientX,
                event.clientY,
                simplePanelId,
            );

            if (!targetPanelId) {
                if (lastPreviewRef.current !== null) {
                    clearDockPreview();
                }

                return;
            }

            const targetElement = getPanelElement(targetPanelId);

            if (!targetElement) {
                if (lastPreviewRef.current !== null) {
                    clearDockPreview();
                }

                return;
            }

            const rect = targetElement.getBoundingClientRect();

            const position = calculateDockPosition(
                rect,
                event.clientX,
                event.clientY,
            );

            const previewKey = `${targetPanelId}:${position}`;

            if (
                lastPreviewRef.current?.targetPanelId === targetPanelId &&
                lastPreviewRef.current.position === previewKey
            ) {
                return;
            }

            lastPreviewRef.current = {
                targetPanelId,
                position: previewKey,
            };

            showDockPreview(targetPanelId, position);
        },
        [
            clearDockPreview,
            flushPosition,
            isSimpleWindow,
            simplePanelId,
            showDockPreview,
        ],
    );

    /*
     * A drag befejezésekor feldolgozzuk az utolsó pozíciót,
     * majd egyszerű ablak esetén végrehajtjuk a dockolást,
     * ha van érvényes előnézet.
     */
    const handlePointerUp = useCallback(
        (event: PointerEvent) => {
            const drag = dragRef.current;

            if (
                !drag.isDragging ||
                drag.pointerId !== event.pointerId
            ) {
                return;
            }

            dragRef.current = INITIAL_DRAG_STATE;

            window.removeEventListener(
                "pointermove",
                handlePointerMove,
            );

            window.removeEventListener(
                "pointerup",
                handlePointerUp,
            );

            window.removeEventListener(
                "pointercancel",
                handlePointerUp,
            );

            const capturedElement = windowRef.current;

            if (
                capturedElement?.hasPointerCapture(event.pointerId)
            ) {
                capturedElement.releasePointerCapture(event.pointerId);
            }

            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
                rafRef.current = null;
            }

            // A legutolsó egérpozíció sem veszhet el.
            if (nextPositionRef.current) {
                const nextPosition = nextPositionRef.current;

                moveFloatingWindow(
                    nodeRef.current.id,
                    nextPosition.x,
                    nextPosition.y,
                );

                nextPositionRef.current = null;
            }

            if (isSimpleWindow && simplePanelId !== null) {
                const preview =
                    useWorkspaceStore.getState().dockPreview;

                if (preview) {
                    dockPanel(
                        simplePanelId,
                        preview.targetPanelId,
                        preview.position,
                    );
                }
            }

            clearDockPreview();
        },
        [
            clearDockPreview,
            dockPanel,
            handlePointerMove,
            isSimpleWindow,
            moveFloatingWindow,
            simplePanelId,
        ],
    );

    /*
     * Ha a komponens megszűnik drag közben, a globális
     * eseménykezelőket és a függőben lévő frame-et is
     * eltávolítjuk.
     */
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

            window.removeEventListener(
                "pointercancel",
                handlePointerUp,
            );

            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }

            lastPreviewRef.current = null;
            cancelHeaderHideTimeout();
        };
    }, [cancelHeaderHideTimeout, handlePointerMove, handlePointerUp]);

    const handleHeaderPointerDown = useCallback(
        (event: ReactPointerEvent<HTMLDivElement>) => {
            // A fejléc gombjai ne indítsanak ablakmozgatást.
            if (
                (event.target as HTMLElement).closest("button")
            ) {
                return;
            }

            if (event.button !== 0) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();

            activateFloatingWindow(nodeRef.current.id);

            showWindowHeader();

            if (!isSimpleWindow) {
                clearDockPreview();
            }

            const currentNode = nodeRef.current;

            dragRef.current = {
                startPointerX: event.clientX,
                startPointerY: event.clientY,
                startX: currentNode.x,
                startY: currentNode.y,
                isDragging: true,
                pointerId: event.pointerId,
            };

            /*
             * A capture az ablak elemére kerül.
             * A pointer eseményeit a globális listener kezeli,
             * és csak a dragot elindító pointert fogadja el.
             */
            windowRef.current?.setPointerCapture(event.pointerId);

            window.addEventListener(
                "pointermove",
                handlePointerMove,
            );

            window.addEventListener(
                "pointerup",
                handlePointerUp,
            );

            window.addEventListener(
                "pointercancel",
                handlePointerUp,
            );
        },
        [
            activateFloatingWindow,
            clearDockPreview,
            handlePointerMove,
            handlePointerUp,
            isSimpleWindow,
            showWindowHeader,
        ],
    );

    /*
     * A fejléc megjelenik a felső szél közelében.
     * Ha a kurzor már a fejlécen van, nem rejtjük el,
     * amikor kissé lejjebb mozdul.
     */
    const handleWindowPointerMove = useCallback(
        (event: ReactPointerEvent<HTMLDivElement>) => {
            if (dragRef.current.isDragging) {
                showWindowHeader();
                return;
            }

            const rect = event.currentTarget.getBoundingClientRect();
            const distanceFromTop = event.clientY - rect.top;

            if (distanceFromTop <= HEADER_EDGE_THRESHOLD) {
                showWindowHeader();
            }
        },
        [showWindowHeader],

    );

    const handleWindowPointerLeave = useCallback(() => {
        if (dragRef.current.isDragging) {
            return;
        }
        scheduleHeaderHide();

    }, [scheduleHeaderHide]);


    return (
        <div
            ref={windowRef}
            className={[
                "absolute overflow-hidden rounded-md border",
                "transition-[border-color,box-shadow] duration-150",
                isActive
                    ? "border-green-400/70 shadow-[0_0_12px_rgba(34,211,238,0.16)]"
                    : "border-slate-700/70 shadow-lg",
            ].join(" ")}
            style={{
                left: node.x,
                top: node.y,
                width: node.width,
                height: node.height,
                zIndex: node.zIndex,
            }}
            onPointerDown={() => {
                activateFloatingWindow(node.id);
            }}
            onPointerMove={handleWindowPointerMove}
            onPointerLeave={handleWindowPointerLeave}
        >

            <div className="h-full w-full">
                <LayoutRenderer node={node.root} />
            </div>

            {/*
         * A fejléc abszolút pozicionált, ezért nem vesz el
         * helyet a paneltartalomtól.
         */}
            <FloatingWindowHeader
                isSimpleWindow={isSimpleWindow}
                isVisible={isHeaderVisible}
                onShow={showWindowHeader}
                onHide={scheduleHeaderHide}
                onPointerDown={handleHeaderPointerDown}
                onClose={() => closeFloatingWindow(node.id)}
            />
        </div>
    );

}
