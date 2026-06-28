import type {
    SplitNode,
} from "../model/panel-layout.types";

import { LayoutRenderer }
    from "./LayoutRenderer";

type Props = {
    node: SplitNode;
};

export function SplitRenderer({
    node,
}: Props) {
    const isHorizontal =
        node.direction === "horizontal";

    return (
        <div
            className={`
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
        </div>
    );
}