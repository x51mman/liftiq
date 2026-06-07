import type {
    InputHTMLAttributes,
    ReactNode,
} from "react";

export type InputVariant =
    | "default"
    | "filled"
    | "ghost";

export type InputSize =
    | "sm"
    | "md"
    | "lg";

export interface InputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "size"
    > {

    size?: InputSize;

    variant?: InputVariant;

    leftIcon?: ReactNode;

    rightIcon?: ReactNode;

    error?: boolean;
}





