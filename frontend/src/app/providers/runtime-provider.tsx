import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export function RuntimeProvider({
    children,
}: Props) {
    return <>{children}</>;
}