import { forwardRef } from "react";

import { cn } from "@/shared/lib";

import { inputVariants } from "./input.variants";
import type { InputProps } from "./input.types";

export const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            variant,
            size,
            leftIcon,
            rightIcon,
            error = false,
            className,
            disabled,
            ...props
        },
        ref,
    ) => {
        return (
            <div className="relative flex w-full items-center">
                {leftIcon && (
                    <div className="absolute left-3 flex items-center">
                        {leftIcon}
                    </div>
                )}

                <input
                    ref={ref}
                    disabled={disabled}
                    className={cn(
                        inputVariants({
                            variant,
                            size,
                            error,
                        }),
                        leftIcon && "pl-10",
                        rightIcon && "pr-10",
                        className,
                    )}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute right-3 flex items-center">
                        {rightIcon}
                    </div>
                )}
            </div>
        );
    },
);

Input.displayName = "Input";