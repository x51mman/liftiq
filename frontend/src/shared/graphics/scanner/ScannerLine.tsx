import { motion } from "framer-motion";

export function ScannerLine() {
    return (
        <motion.div
            className="
                absolute
                left-0
                h-px
                w-full
                bg-cyan-400/20
                shadow-[0_0_12px_rgba(34,211,238,0.35)]
            "
            initial={{
                top: "0%",
            }}
            animate={{
                top: ["0%", "100%", "0%"],
            }}
            transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
            }}
        />
    );
}