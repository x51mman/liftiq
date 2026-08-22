import {
    useWorkspaceStore,
} from "@/app/shell/workspace";

import {
    useNavigation,
} from "@/app/navigation";

export function Sidebar() {

    const {
        items,
    } = useNavigation();

    const openPanel =
        useWorkspaceStore(
            state =>
                state.openPanel,
        );

    return (

        <aside
            className="
                w-64
                shrink-0

                border-r
                border-cyan-500/20

                p-4
            "
        >

            <nav
                className="
                    space-y-1
                "
            >

                {items.map(
                    item => (

                        <button
                            key={item.id}
                            type="button"

                            onClick={() =>
                                openPanel(
                                    item.panelId,
                                )
                            }

                            className="
                                block
                                w-full

                                rounded-md

                                px-3
                                py-2

                                text-left
                                text-sm

                                text-cyan-100

                                transition-colors

                                hover:bg-cyan-500/10
                                hover:text-white
                            "
                        >
                            {item.label}
                        </button>

                    ),
                )}

            </nav>

        </aside>
    );
}