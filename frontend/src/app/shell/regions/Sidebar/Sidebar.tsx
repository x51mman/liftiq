import { useNavigation } from "@/app/navigation";
import { NavLink } from "react-router-dom";

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

                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) =>
                            `
                        block
                        rounded-md
                        px-3
                        py-2
                        text-sm
                        transition-colors
                        text-cyan-100
                        ${isActive
                                ? "bg-cyan-500/20 text-white"
                                : "hover:bg-cyan-500/10 hover:text-white"
                            }
        `
                        }
                    >
                        {item.label}
                    </NavLink>

                ))}

            </nav>
        </aside>
    );
}