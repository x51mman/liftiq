import { useState } from "react";

import { Button, Input } from "@/shared/ui";
import { login } from "../../model/auth.actions";

export function LoginForm() {
    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    async function handleSubmit(
        event: React.FormEvent,
    ) {
        event.preventDefault();

        try {
            await login(
                username,
                password,
            );
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form
            className="space-y-4"
            onSubmit={handleSubmit}
        >
            <Input
                placeholder="Felhasználónév"
                value={username}
                onChange={(event) =>
                    setUsername(
                        event.target.value,
                    )
                }
            />

            <Input
                type="password"
                placeholder="Jelszó"
                value={password}
                onChange={(event) =>
                    setPassword(
                        event.target.value,
                    )
                }
            />

            <Button
                className="w-full"
                type="submit"
            >
                Bejelentkezés
            </Button>
        </form>
    );
}