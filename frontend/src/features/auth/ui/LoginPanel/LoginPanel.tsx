import { LoginHeader } from "./LoginHeader";
import { LoginForm } from "./LoginForm";
import { LoginStatus } from "./LoginStatus";
import { LoginVersion } from "./LoginVersion";

export function LoginPanel() {
    return (
        <div
            className="
                w-full
                max-w-[430px]
                rounded-2xl
                border
                border-cyan-500/20
                bg-slate-900/70
                backdrop-blur-xl
                shadow-2xl
                p-8
                space-y-6
            "
        >
            <LoginHeader />

            <LoginForm />

            <LoginStatus />

            <LoginVersion />
        </div>
    );
}