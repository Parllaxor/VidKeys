import type { AuthUser } from "./auth";

const AUTH_STORAGE_KEY = "vidkeys-auth";

export function loadAuthUsers(): AuthUser[] {
    const data = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

export function saveAuthUsers(authUsers: AuthUser[]) {
    localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify(authUsers)
    );
}