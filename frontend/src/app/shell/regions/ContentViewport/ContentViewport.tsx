import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function ContentViewport({
    children,
}: Props) {
    return (
        <main
            className="
                flex-1
                overflow-auto
                p-6
            "
        >
            {children}
        </main>
    );
}