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

    const bringFloatingWindowToFront = useWorkspaceStore(
        (state) => state.bringFloatingWindowToFront,
    );

    const dockPanel = useWorkspaceStore(
        (state) => state.dockPanel,
    );

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
    const [isPointerOverHeader, setIsPointerOverHeader] = useState(false);

    const nodeRef = useRef(node);
    const dragRef = useRef<DragState>(INITIAL_DRAG_STATE);

    const windowRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);

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
            setIsHeaderVisible(isPointerOverHeader);
        },
        [
            clearDockPreview,
            dockPanel,
            handlePointerMove,
            isPointerOverHeader,
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
        };
    }, [handlePointerMove, handlePointerUp]);

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

            bringFloatingWindowToFront(nodeRef.current.id);

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
            bringFloatingWindowToFront,
            clearDockPreview,
            handlePointerMove,
            handlePointerUp,
            isSimpleWindow,
        ],
    );

    /*
     * A fejléc megjelenik a felső szél közelében.
     * Ha a kurzor már a fejlécen van, nem rejtjük el,
     * amikor kissé lejjebb mozdul.
     */
    const handleWindowPointerMove = useCallback(
        (event: ReactPointerEvent<HTMLDivElement>) => {
            if (
                dragRef.current.isDragging ||
                isPointerOverHeader
            ) {
                return;
            }

            const rect = event.currentTarget.getBoundingClientRect();
            const distanceFromTop = event.clientY - rect.top;

            setIsHeaderVisible(
                distanceFromTop <= HEADER_EDGE_THRESHOLD,
            );
        },
        [isPointerOverHeader],
    );

    const handleWindowPointerLeave = useCallback(() => {
        if (
            !dragRef.current.isDragging &&
            !isPointerOverHeader
        ) {
            setIsHeaderVisible(false);
        }
    }, [isPointerOverHeader]);

    const handleHeaderPointerEnter = useCallback(() => {
        setIsPointerOverHeader(true);
        setIsHeaderVisible(true);
    }, []);

    const handleHeaderPointerLeave = useCallback(() => {
        setIsPointerOverHeader(false);

        if (!dragRef.current.isDragging) {
            setIsHeaderVisible(false);
        }
    }, []);

    return (
        <div
            ref={windowRef}
            className="absolute overflow-hidden rounded-md shadow-lg"
            style={{
                left: node.x,
                top: node.y,
                width: node.width,
                height: node.height,
                zIndex: node.zIndex,
            }}
            onPointerDown={() => {
                bringFloatingWindowToFront(node.id);
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
            <div
                ref={headerRef}
                className={`
                absolute
                inset-x-0
                top-0
                z-50
                flex
                h-8
                items-center
                justify-between
                border-b
                border-cyan-400/20
                bg-slate-950/90
                px-3
                backdrop-blur-md
                transition-opacity
                duration-200
                ${isHeaderVisible
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                    }
            `}
                onPointerDown={handleHeaderPointerDown}
                onPointerEnter={handleHeaderPointerEnter}
                onPointerLeave={handleHeaderPointerLeave}
            >
                <div className="flex min-w-0 flex-1 items-center gap-2">
                    <span
                        className="
                        h-1.5
                        w-1.5
                        shrink-0
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_8px_rgba(34,211,238,0.8)]
                    "
                    />

                    <span
                        className="
                        select-none
                        truncate
                        text-[10px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-cyan-100/80
                    "
                    >
                        {isSimpleWindow
                            ? "Floating Panel"
                            : "Floating Workspace"}
                    </span>
                </div>

                <button
                    type="button"
                    aria-label="Close floating window"
                    title="Close window"
                    className="
                    ml-3
                    flex
                    h-5
                    w-5
                    shrink-0
                    items-center
                    justify-center
                    rounded
                    text-slate-400
                    transition-colors
                    hover:bg-red-500/20
                    hover:text-red-300
                "
                    onPointerDown={(event) => {
                        event.stopPropagation();
                    }}
                    onClick={(event) => {
                        event.stopPropagation();
                        closeFloatingWindow(nodeRef.current.id);
                    }}
                >
                    ×
                </button>
            </div>
        </div>
    );

}
