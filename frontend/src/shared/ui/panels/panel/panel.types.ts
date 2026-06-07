import type {
    HTMLAttributes,
    ReactNode,
} from "react";

export type PanelVariant =
    | "default"
    | "glass"
    | "hud";

export type PanelPadding =
    | "sm"
    | "md"
    | "lg";

export interface PanelProps
    extends HTMLAttributes<HTMLDivElement> {
    variant?: PanelVariant;

    padding?: PanelPadding;

    children?: ReactNode;
}