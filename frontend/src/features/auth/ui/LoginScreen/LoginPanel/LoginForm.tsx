import { Button } from "@/shared/ui";
import { Input } from "@/shared/ui";

export function LoginForm() {
    return (
        <form className="space-y-4">
            <Input
                placeholder="Felhasználónév"
            />

            <Input
                type="password"
                placeholder="Jelszó"
            />

            <Button
                className="w-full"
                disabled
            >
                Bejelentkezés
            </Button>
        </form>
    );
}