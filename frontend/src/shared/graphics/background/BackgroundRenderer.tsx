import { BackgroundImage } from "./layers/BackgroundImage";
import { GradientOverlay } from "./layers/GradientOverlay";
import { NoiseLayer } from "./layers/NoiseLayer";
import { VignetteLayer } from "./layers/VignetteLayer";

export function BackgroundRenderer() {
    return (
        <>
            <BackgroundImage />

            <GradientOverlay />

            <NoiseLayer />

            <VignetteLayer />
        </>
    );
}