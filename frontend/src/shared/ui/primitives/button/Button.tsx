import {
    forwardRef,
} from "react";

import type {
    ButtonProps,
} from "./button.types";

import {
    buttonVariants,
} from "./button.variants";

import { cn } from "@/shared/lib";

export const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(
    (
        {
            variant,
            size,
            loading = false,
            leftIcon,
            rightIcon,
            className,
            disabled,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                    }),
                    className,
                )}
                {...props}
            >
                {loading ? (
                    "Loading..."
                ) : (
                    <>
                        {leftIcon}

                        {children}

                        {rightIcon}
                    </>
                )}
            </button>
        );
    },
);

Button.displayName = "Button";