export async function apiClient<T>(
    input: RequestInfo | URL,
    init?: RequestInit,
): Promise<T> {

    const response =
        await fetch(input, init);

    if (!response.ok) {

        throw new Error(
            `HTTP ${response.status}`,
        );

    }

    return response.json() as Promise<T>;
}

/*
axios
token refresh
interceptors
error handling
*/