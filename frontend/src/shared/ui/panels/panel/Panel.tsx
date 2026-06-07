import { forwardRef } from "react";

import { cn } from "@/shared/lib";

import { panelVariants } from "./panel.variants";
import type { PanelProps } from "./panel.types";

export const Panel = forwardRef<
    HTMLDivElement,
    PanelProps
>(
    (
        {
            variant,
            padding,
            className,
            children,
            ...props
        },
        ref,
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    panelVariants({
                        variant,
                        padding,
                    }),
                    className,
                )}
                {...props}
            >
                {children}
            </div>
        );
    },
);

Panel.displayName = "Panel";