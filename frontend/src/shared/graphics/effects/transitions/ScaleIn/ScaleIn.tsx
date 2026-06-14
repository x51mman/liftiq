import { motion } from "framer-motion";
import type { ReactNode } from "react";

type ScaleInProps = {
    children: ReactNode;
};

export function ScaleIn({
    children,
}: ScaleInProps) {
    return (
        <motion.div
            initial={{
                opacity: 0,
                scale: 0.96,
            }}
            animate={{
                opacity: 1,
                scale: 1,
            }}
            transition={{
                duration: 0.4,
            }}
        >
            {children}
        </motion.div>
    );
}