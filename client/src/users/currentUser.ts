//
//  currentUser.ts
//  
//
//  Created by Devin Coombs on 23.08.26.
//

import type { User } from "./user";
import { getUserById } from "./userDatabase";
import { loadCurrentUserId, saveCurrentUserId, clearCurrentUserId } from "./currentUserStorage";

let currentUserId: string | null = loadCurrentUserId();

export function getCurrentUser(): User | undefined {
    if (!currentUserId) {
        return undefined;
    }
    
    return getUserById(currentUserId);
}

export function setCurrentUser(user: User): void {
    currentUserId = user.id;
    saveCurrentUserId(user.id);
}

export function logout(): void {
    currentUserId = null;
    clearCurrentUserId();
}

export function isLoggedIn(): boolean {
    return getCurrentUser() !== undefined;
}
