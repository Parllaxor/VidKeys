const CURRENT_USER_STORAGE_KEY = "vidkeys-current-user";

export function loadCurrentUserId(): string | null {
    return localStorage.getItem(CURRENT_USER_STORAGE_KEY);
}

export function saveCurrentUserId(userId: string): void {
    localStorage.setItem(CURRENT_USER_STORAGE_KEY, userId);
}

export function clearCurrentUserId(): void {
    localStorage.removeItem(CURRENT_USER_STORAGE_KEY);
}
