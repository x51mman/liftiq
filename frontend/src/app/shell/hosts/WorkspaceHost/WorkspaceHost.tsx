import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function WorkspaceHost({
    children,
}: Props) {
    return (
        <div className="relative z-20 h-full w-full">
            {children}
        </div>
    );
}