import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function Center({ children }: Props) {
    return (
        <div
            className="
                absolute
                inset-0

                flex

                items-center

                justify-center

                p-6
            "
        >
            {children}
        </div>
    );
}