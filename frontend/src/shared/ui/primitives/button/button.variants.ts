import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    [
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",
        "rounded-xl",
        "font-medium",
        "transition-all",
        "duration-200",
        "select-none",
        "outline-none",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                primary:
                    "bg-cyan-500 text-black hover:bg-cyan-400",

                secondary:
                    "bg-slate-700 text-white hover:bg-slate-600",

                ghost:
                    "border border-cyan-500 bg-transparent text-cyan-400 hover:bg-cyan-500/10",

                danger:
                    "bg-red-600 text-white hover:bg-red-500",
            },

            size: {
                sm:
                    "h-9 px-3 text-sm",

                md:
                    "h-11 px-5 text-base",

                lg:
                    "h-12 px-6 text-lg",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    },
);