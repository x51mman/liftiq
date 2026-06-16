export function Statusbar() {
    return (
        <footer
            className="
                flex
                h-8
                items-center
                justify-between
                border-t
                border-cyan-500/20
                px-4
                text-xs
            "
        >
            <span>
                API: Connected
            </span>

            <span>
                LiftIQ 0.1.0
            </span>
        </footer>
    );
}