import type { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export function ContentLayer({
    children,
}: Props) {
    return (
        <div className="relative z-10 flex min-h-screen">
            {children}
        </div>
    );
}