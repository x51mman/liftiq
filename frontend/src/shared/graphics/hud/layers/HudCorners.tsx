type Props = {
    className?: string;
};

export function HudCorners({ className = "", }: Props) {
    return (
        <div
            className={`absolute h-10 w-10 border-cyan-400/40 ${className}`}
        />
    )
}