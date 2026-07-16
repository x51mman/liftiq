import type {
    FloatingNode,
} from "../model";

import {
    panelDefinitions,
} from "../registry";

type Props = {
    node: FloatingNode;
};

export function FloatingWindow({
    node,
}: Props) {

    const Component =
        panelDefinitions[
            node.panelId
        ]?.component;

    if (!Component) {
        return null;
    }

    return (

        <div
            className="
                absolute
                border
                bg-background
                shadow-lg
                overflow-hidden
            "
            style={{

                left:
                    node.x,

                top:
                    node.y,

                width:
                    node.width,

                height:
                    node.height,
            }}
        >

            <Component />

        </div>
    );
}