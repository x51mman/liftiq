export function Topbar() {
    return (
        <header
            className="
                flex
                h-14
                items-center
                justify-between
                border-b
                border-cyan-500/20
                px-6
            "
        >
            <div>
                LiftIQ
            </div>

            <div
                className="
                    text-sm
                    text-slate-400
                "
            >
                Development Environment
            </div>
        </header>
    );
}