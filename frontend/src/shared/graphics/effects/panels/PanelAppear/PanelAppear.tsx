import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PanelAppearProps = {
    children: ReactNode;
};

export function PanelAppear({
    children,
}: PanelAppearProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 16,
                scale: 0.985,
            }}
            animate={{
                opacity: 1,
                y: 0,
                scale: 1,
            }}
            transition={{
                duration: 0.45,
            }}
        >
            {children}
        </motion.div>
    );
}