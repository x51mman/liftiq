import { useRef } from "react";

import type {
    SplitNode,
} from "../model/panel-layout.types";

import { LayoutRenderer }
    from "./LayoutRenderer";

import { SplitDivider }
    from "./SplitDivider";

import { getDividerPositions } from "../engine";

type Props = {
    node: SplitNode;
};

export function SplitRenderer({
    node,
}: Props) {
    const isHorizontal =
        node.direction === "horizontal";

    const containerRef =
        useRef<HTMLDivElement>(null);

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
                    : "flex-col"}
            `}
        >
            {node.children.map(
                (child, index) => {
                    const size =
                        node.sizes[index] ?? 0;

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
                (position, index) => (
                    <SplitDivider
                        key={index}
                        splitId={node.id}
                        direction={
                            node.direction
                        }
                        index={index}
                        position={position}
                        containerRef={
                            containerRef
                        }
                    />
                ),
            )}
        </div>
    );
}