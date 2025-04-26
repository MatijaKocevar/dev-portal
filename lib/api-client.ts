export async function apiClient(url: string, options: RequestInit = {}) {
    const response = await fetch(url, {
        ...options,
        credentials: "same-origin",
        headers: options.headers || {},
    });

    if (response.status === 401) {
        window.location.href = "/login";
        return;
    }

    return response;
}
