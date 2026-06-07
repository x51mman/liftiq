import {
    BackgroundLayer,
    HudLayer,
    ContentLayer,
    OverlayLayer,
} from "./layers";

export function ApplicationShell() {
    return (
        <main className="relative min-h-screen overflow-hidden">
            <BackgroundLayer />

            <HudLayer />

            <ContentLayer>
                LiftIQ
            </ContentLayer>

            <OverlayLayer />
        </main>
    );
}