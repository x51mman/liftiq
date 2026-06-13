import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function Screen({ children }: Props) {
    return (
        <main
            className="
                relative
                min-h-screen
                w-full
                overflow-hidden
            "
        >
            {children}
        </main>
    );
}