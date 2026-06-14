import { motion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
    children: ReactNode;
    delay?: number;
};

export function FadeIn({
    children,
    delay = 0,
}: FadeInProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            transition={{
                duration: 0.6,
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}