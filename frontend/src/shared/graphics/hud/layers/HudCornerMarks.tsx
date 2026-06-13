export function HudCornerMarks() {
    return (
        <>
            <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-cyan-400/40" />

            <div className="absolute right-6 top-6 h-8 w-8 border-r border-t border-cyan-400/40" />

            <div className="absolute left-6 bottom-6 h-8 w-8 border-l border-b border-cyan-400/40" />

            <div className="absolute right-6 bottom-6 h-8 w-8 border-r border-b border-cyan-400/40" />
        </>
    );
}