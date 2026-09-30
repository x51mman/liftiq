import { useRef } from "react";

import type {
    SplitNode,
} from "../model/panel-layout.types";

import {
    LayoutRenderer,
} from "./LayoutRenderer";

import {
    SplitDivider,
} from "./SplitDivider";

import {
    getDividerPositions,
} from "../engine";

import {
    calculateLayoutMinSize,
} from "./calculate-layout-min-size";

type Props = {
    node: SplitNode;
};

export function SplitRenderer({
    node,
}: Props) {

    const isHorizontal =
        node.direction ===
        "horizontal";

    const containerRef =
        useRef<HTMLDivElement>(
            null,
        );

    /*
     * Calculate the minimum size of
     * every complete child LayoutNode.
     *
     * This recursively includes:
     *
     * PanelNode
     * TabsNode
     * SplitNode
     *
     * and therefore represents the
     * actual minimum size of the
     * complete child subtree.
     */
    const childMinSizes =
        node.children.map(
            child =>
                calculateLayoutMinSize(
                    child,
                ),
        );

    /*
     * A horizontal split is constrained
     * by child widths.
     *
     * A vertical split is constrained
     * by child heights.
     */
    const minSizes =
        isHorizontal
            ? childMinSizes.map(
                size =>
                    size.width,
            )
            : childMinSizes.map(
                size =>
                    size.height,
            );

    const dividerPositions =
        getDividerPositions(
            node.sizes,
        );

    return (

        <div
            ref={containerRef}
            className={`
                relative
                flex
                h-full
                w-full

                ${isHorizontal
                    ? "flex-row"
                    : "flex-col"
                }
            `}
        >

            {node.children.map(
                (
                    child,
                    index,
                ) => {

                    const size =
                        node.sizes[
                        index
                        ] ?? 0;

                    return (

                        <div
                            key={child.id}
                            className="
                                min-h-0
                                min-w-0
                                shrink-0
                            "
                            style={
                                isHorizontal
                                    ? {
                                        width:
                                            `${size}%`,
                                        height:
                                            "100%",
                                    }
                                    : {
                                        height:
                                            `${size}%`,
                                        width:
                                            "100%",
                                    }
                            }
                        >

                            <LayoutRenderer
                                node={child}
                            />

                        </div>

                    );
                },
            )}

            {dividerPositions.map(
                (
                    position,
                    index,
                ) => (

                    <SplitDivider
                        key={index}

                        splitId={
                            node.id
                        }

                        direction={
                            node.direction
                        }

                        index={
                            index
                        }

                        position={
                            position
                        }

                        containerRef={
                            containerRef
                        }

                        minSizes={
                            minSizes
                        }
                    />

                ),
            )}

        </div>

    );
}