import { LoginBackground } from "./LoginBackground";
import { LoginHud } from "./LoginHud";
import { LoginContainer } from "./LoginContainer";
import { LoginFooter } from "./LoginFooter";
import { LoginOverlay } from "./LoginOverlay";

export function LoginScreen() {
    return (
        <>
            <LoginBackground />

            <LoginOverlay />

            <LoginHud />

            <LoginContainer />

            <LoginFooter />
        </>
    );
}