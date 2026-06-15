import { BackgroundLayer, HudLayer, } from "./layers";

export function GraphicsHost() {
    return (
        <>
            <BackgroundLayer />

            <HudLayer />
        </>
    );
}