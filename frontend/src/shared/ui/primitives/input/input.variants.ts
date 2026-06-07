import { cva } from "class-variance-authority";

export const inputVariants = cva(
    [
        "w-full",
        "rounded-xl",
        "border",
        "transition-all",
        "outline-none",
        "font-medium",
    ],
    {
        variants: {
            variant: {
                default:
                    "border-slate-700 bg-slate-900",

                filled:
                    "border-transparent bg-slate-800",

                ghost:
                    "border-cyan-500 bg-transparent",
            },

            size: {
                sm:
                    "h-9 px-3 text-sm",

                md:
                    "h-11 px-4 text-base",

                lg:
                    "h-12 px-5 text-lg",
            },

            error: {
                true:
                    "border-red-500",

                false:
                    "",
            },
        },

        defaultVariants: {
            variant: "default",
            size: "md",
            error: false,
        },
    },
);