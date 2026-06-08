import { LoginPanel } from "./LoginPanel";

export function LoginContainer() {
    return (
        <div
            className="
                fixed
                inset-0
                flex
                items-center
                justify-center
                p-6
            "
        >
            <LoginPanel />
        </div>
    );
}