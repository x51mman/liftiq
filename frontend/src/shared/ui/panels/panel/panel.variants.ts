import { cva } from "class-variance-authority";

export const panelVariants = cva(
    [
        "rounded-2xl",
        "border",
        "transition-all",
    ],
    {
        variants: {
            variant: {
                default:
                    "border-slate-700 bg-slate-900",

                glass:
                    "border-cyan-500/30 bg-slate-900/60 backdrop-blur-xl",

                hud:
                    "border-cyan-500 bg-slate-950/70",
            },

            padding: {
                sm: "p-3",

                md: "p-5",

                lg: "p-7",
            },
        },

        defaultVariants: {
            variant: "default",
            padding: "md",
        },
    },
);