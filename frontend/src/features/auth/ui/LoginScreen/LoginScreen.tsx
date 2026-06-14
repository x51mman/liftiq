import { Center } from "@/shared/layout";
import { PanelAppear } from "@/shared/graphics";
import { LoginPanel } from "./LoginPanel";

export function LoginScreen() {
    return (
        <Center>
            <PanelAppear>
                <LoginPanel />
            </PanelAppear>
        </Center>
    );
}