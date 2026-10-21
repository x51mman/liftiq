import type {
    FloatingWindowModel,
} from "../model";

import {
    FloatingWindow,
} from "./FloatingWindow";

type Props = {
    nodes: FloatingWindowModel[];
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