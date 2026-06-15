import { useAuthStore } from "./auth.store";

export async function bootstrapAuth() {

    const store =
        useAuthStore.getState();

    store.setStatus("loading");

    // később:
    // refresh token
    // cookie
    // session validate

    await new Promise((resolve) =>
        setTimeout(resolve, 300),
    );

    store.setStatus(
        "authenticated",
    );

}