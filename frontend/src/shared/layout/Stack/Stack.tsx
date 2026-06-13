import { cn } from "@/shared/lib/cn";
import type { StackProps } from "./stack.types";

const gaps = {

    sm: "space-y-2",

    md: "space-y-4",

    lg: "space-y-6",

};

export function Stack({

    children,

    gap = "md",

}: StackProps) {

    return (

        <div className={cn(gaps[gap])}>

            {children}

        </div>

    );

}