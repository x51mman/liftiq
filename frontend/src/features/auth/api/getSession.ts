import type { UserSession } from "../model";

export async function getSession(): Promise<UserSession | null> {

    await new Promise((resolve) =>
        setTimeout(resolve, 300),
    );

    return null;
}