import type { ReactNode } from "react";

type Props = {
    children?: ReactNode;
};

export function WorkspaceCanvas({
    children,
}: Props) {
    return (
        <div className="h-full w-full">
            {children}
        </div>
    );
}