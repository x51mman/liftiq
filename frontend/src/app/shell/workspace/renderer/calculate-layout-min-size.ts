import type {
    LayoutNode,
    PanelNode,
    TabsNode,
    SplitNode,
} from "../model";

import {
    getPanelHeaderElement,
} from "./panel-header-dom-registry";

export type LayoutMinSize = {
    width: number;
    height: number;
};

const DEFAULT_HEADER_HEIGHT = 40;
const DEFAULT_MIN_WIDTH = 120;

function getElementWidth(
    element: HTMLElement | null,
): number {
    if (!element) {
        return DEFAULT_MIN_WIDTH;
    }

    const children =
        Array.from(
            element.children,
        ) as HTMLElement[];

    /*
     * PanelHeader:
     *
     * <header>
     *     <title-group />
     *     <actions-group />
     * </header>
     *
     * Both groups use shrink-0, therefore their
     * rendered widths represent their intrinsic
     * content widths.
     */
    if (children.length > 0) {
        const contentWidth =
            children.reduce(
                (
                    total,
                    child,
                ) =>
                    total +
                    child.getBoundingClientRect()
                        .width,
                0,
            );

        const styles =
            window.getComputedStyle(
                element,
            );

        const paddingLeft =
            parseFloat(
                styles.paddingLeft,
            ) || 0;

        const paddingRight =
            parseFloat(
                styles.paddingRight,
            ) || 0;

        const width =
            contentWidth +
            paddingLeft +
            paddingRight;

        if (width > 0) {
            return Math.ceil(width);
        }
    }

    /*
     * Fallback for elements without children.
     */
    const width =
        element.scrollWidth;

    if (width <= 0) {
        return DEFAULT_MIN_WIDTH;
    }

    return Math.ceil(width);
}

function getElementHeight(
    element: HTMLElement | null,
): number {
    if (!element) {
        return DEFAULT_HEADER_HEIGHT;
    }

    const height =
        element.getBoundingClientRect()
            .height;

    if (height <= 0) {
        return DEFAULT_HEADER_HEIGHT;
    }

    return Math.ceil(height);
}

function getPanelMinSize(
    node: PanelNode,
): LayoutMinSize {
    const header =
        getPanelHeaderElement(
            node.panelId,
        );

    return {
        width:
            getElementWidth(
                header,
            ),
        height:
            getElementHeight(
                header,
            ),
    };
}

function getTabsMinSize(
    node: TabsNode,
): LayoutMinSize {
    let width = 0;

    let height =
        DEFAULT_HEADER_HEIGHT;

    for (
        const panelId
        of node.panelIds
    ) {
        const header =
            getPanelHeaderElement(
                panelId,
            );

        width +=
            getElementWidth(
                header,
            );

        height =
            Math.max(
                height,
                getElementHeight(
                    header,
                ),
            );
    }

    return {
        width,
        height,
    };
}

function getSplitMinSize(
    node: SplitNode,
): LayoutMinSize {
    if (
        node.children.length === 0
    ) {
        return {
            width: 0,
            height: 0,
        };
    }

    const childSizes =
        node.children.map(
            child =>
                calculateLayoutMinSize(
                    child,
                ),
        );

    if (
        node.direction ===
        "horizontal"
    ) {
        return {
            width:
                childSizes.reduce(
                    (
                        total,
                        size,
                    ) =>
                        total +
                        size.width,
                    0,
                ),

            height:
                childSizes.reduce(
                    (
                        maximum,
                        size,
                    ) =>
                        Math.max(
                            maximum,
                            size.height,
                        ),
                    0,
                ),
        };
    }

    return {
        width:
            childSizes.reduce(
                (
                    maximum,
                    size,
                ) =>
                    Math.max(
                        maximum,
                        size.width,
                    ),
                0,
            ),

        height:
            childSizes.reduce(
                (
                    total,
                    size,
                ) =>
                    total +
                    size.height,
                0,
            ),
    };
}

export function calculateLayoutMinSize(
    node: LayoutNode,
): LayoutMinSize {
    switch (node.type) {
        case "panel":
            return getPanelMinSize(
                node,
            );

        case "tabs":
            return getTabsMinSize(
                node,
            );

        case "split":
            return getSplitMinSize(
                node,
            );

        default:
            return {
                width: 0,
                height: 0,
            };
    }
}