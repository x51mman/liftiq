import { BackgroundImage } from "./BackgroundImage";
import { BackgroundVideo } from "./BackgroundVideo";
import { GradientOverlay } from "./GradientOverlay";
import { NoiseLayer } from "./NoiseLayer";
import { VignetteLayer } from "./VignetteLayer";

export function LoginBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden">

            <BackgroundImage />

            <BackgroundVideo />

            <GradientOverlay />

            <NoiseLayer />

            <VignetteLayer />

        </div>
    );
}