import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

type Props = {
    children: ReactNode;
};

export function RouterProvider({
    children,
}: Props) {
    return (
        <BrowserRouter>
            {children}
        </BrowserRouter>
    );
}