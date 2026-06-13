import type { ReactNode } from "react";

export type StackGap =
    | "sm"
    | "md"
    | "lg";

export interface StackProps {

    children: ReactNode;

    gap?: StackGap;

}