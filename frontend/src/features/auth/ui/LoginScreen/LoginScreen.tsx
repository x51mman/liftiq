import { LoginBackground } from "./LoginBackground";
import { LoginHud } from "./LoginHud";
import { LoginPanel } from "./LoginPanel";
import { LoginFooter } from "./LoginFooter";

export function LoginScreen() {
    return (
        <>
            <LoginBackground />

            <LoginHud />

            <LoginPanel />

            <LoginFooter />
        </>
    );
}