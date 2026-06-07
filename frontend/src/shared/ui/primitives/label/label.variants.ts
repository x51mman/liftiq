import { cva } from "class-variance-authority";

export const labelVariants = cva(
    [
        "mb-2",
        "block",
        "text-sm",
        "font-medium",
        "tracking-wide",
        "text-slate-200",
        "select-none",
    ],
);