import type { User } from "./user";

const STORAGE_KEY = "vidkeys-users";

export function loadUsers(): User[] {
    const data = localStorage.getItem(STORAGE_KEY);
    
    if (!data) {
        return [];
    }

    return JSON.parse(data);
}

export function saveUsers(users: User[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}