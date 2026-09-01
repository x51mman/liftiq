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

    const width =
        element.getBoundingClientRect().width;

    if (width <= 0) {
        return DEFAULT_MIN_WIDTH;
    }

    return width;
}

function getElementHeight(
    element: HTMLElement | null,
): number {

    if (!element) {
        return DEFAULT_HEADER_HEIGHT;
    }

    const height =
        element.getBoundingClientRect().height;

    if (height <= 0) {
        return DEFAULT_HEADER_HEIGHT;
    }

    return height;
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
    let height = DEFAULT_HEADER_HEIGHT;

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