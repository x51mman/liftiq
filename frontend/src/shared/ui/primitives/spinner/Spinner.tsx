import { cn } from "@/shared/lib";

import { spinnerVariants } from "./spinner.variants";
import type { SpinnerProps } from "./spinner.types";

export function Spinner({
    size,
    className,
}: SpinnerProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                spinnerVariants({
                    size,
                }),
                className,
            )}
        />
    );
}