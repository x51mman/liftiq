import { forwardRef } from "react";

import { cn } from "@/shared/lib";

import { labelVariants } from "./label.variants";
import type { LabelProps } from "./label.types";

export const Label = forwardRef<
    HTMLLabelElement,
    LabelProps
>(({ required, className, children, ...props }, ref) => {
    return (
        <label
            ref={ref}
            className={cn(labelVariants(), className)}
            {...props}
        >
            {children}

            {required && (
                <span className="ml-1 text-red-400">*</span>
            )}
        </label>
    );
});

Label.displayName = "Label";