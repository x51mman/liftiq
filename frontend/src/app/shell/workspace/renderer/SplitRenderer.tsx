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
                (child) => (
                    <div
                        key={child.id}
                        className="
                            min-h-0
                            min-w-0
                            flex-1
                        "
                    >
                        <LayoutRenderer
                            node={child}
                        />
                    </div>
                ),
            )}
        </div>
    );
}