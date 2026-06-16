import { useNavigation } from "@/app/navigation";

export function Sidebar() {

    const { items } =
        useNavigation();

    return (
        <aside
            className="
                w-64
                border-r
                border-cyan-500/20
                p-4
            "
        >
            <nav className="space-y-1">

                {items.map((item) => (

                    <button
                        key={item.id}
                        className="
                            block
                            w-full
                            rounded-md
                            px-3
                            py-2
                            text-left
                            text-sm
                            hover:bg-cyan-500/10
                        "
                    >
                        {item.label}
                    </button>

                ))}

            </nav>
        </aside>
    );
}