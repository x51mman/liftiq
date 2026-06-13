import { Screen, Center } from "@/shared/layout";
import { LoginBackground } from "./LoginBackground";
import { LoginHud } from "./LoginHud";
//import { LoginContainer } from "./LoginContainer";
//import { LoginFooter } from "./LoginFooter";
import { LoginOverlay } from "./LoginOverlay";
import { LoginPanel } from "./LoginPanel";
import { PanelAppear } from "@/shared/graphics";

export function LoginScreen() {
    return (
        <>
            <Screen>

                <LoginBackground />

                <LoginOverlay />

                <LoginHud />

                <Center>

                    <PanelAppear>

                        <LoginPanel />

                    </PanelAppear>

                </Center>

            </Screen>
        </>
    );
}