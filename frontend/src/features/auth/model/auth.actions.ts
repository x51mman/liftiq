import { useAuthStore } from "./auth.store";

export async function bootstrapAuth() {
    const store = useAuthStore.getState();

    store.setStatus("loading");

    await new Promise((resolve) =>
        setTimeout(resolve, 300),
    );

    // később cookie/token check
    store.setStatus("unauthenticated");
}

export async function login(
    username: string,
    password: string,
) {
    const store = useAuthStore.getState();

    store.setStatus("loading");

    await new Promise((resolve) =>
        setTimeout(resolve, 600),
    );

    if (
        username === "admin" &&
        password === "admin"
    ) {
        store.setSession({
            id: "1",
            username: "admin",
            displayName: "Administrator",
            role: "administrator",
        });

        store.setStatus("authenticated");
        return;
    }

    store.setStatus("unauthenticated");

    throw new Error("Invalid credentials");
}

export function logout() {
    const store = useAuthStore.getState();

    store.setSession(null);
    store.setStatus("unauthenticated");
}