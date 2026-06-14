import { HudGrid } from "./layers/HudGrid";
import { HudScanner } from "./layers/HudScanner";
import { HudCorners } from "./layers/HudCorners";
import { HudCoordinates } from "./layers/HudCoordinates";
import { HudTactical } from "./layers/HudTactical";
import { HudAmbient } from "./layers/HudAmbient";

export function Hud() {
    return (
        <div
            className="
                pointer-events-none
                fixed
                inset-0
                overflow-hidden
                select-none
            "
        >
            <HudGrid />

            <HudAmbient />

            <HudScanner />

            <HudCorners />

            <HudCoordinates />

            <HudTactical />
        </div>
    );
}