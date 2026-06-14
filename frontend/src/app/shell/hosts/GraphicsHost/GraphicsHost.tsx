import {
    BackgroundRenderer,
    Hud,
} from "@/shared/graphics";

export function GraphicsHost() {
    return (
        <>
            <BackgroundRenderer />
            <Hud />
        </>
    );
}