import type {
    FloatingNode,
} from "../model";

import {
    FloatingWindow,
} from "./FloatingWindow";

type Props = {
    nodes: FloatingNode[];
};

export function FloatingRenderer({
    nodes,
}: Props) {

    return (
        <>
            {nodes.map(
                node => (
                    <FloatingWindow
                        key={node.id}
                        node={node}
                    />
                ),
            )}
        </>
    );
}