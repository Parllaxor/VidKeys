import type { User } from "./user";
import {
    loadCurrentUserId,
    saveCurrentUserId,
    clearCurrentUserId,
} from "./currentUserStorage";
import { supabase } from "../services/supabase";

let currentUserId: string | null = loadCurrentUserId();
let currentUser: User | undefined;

export function getCurrentUser(): User | undefined {
    return currentUser;
}

export function setCurrentUser(user: User): void {
    currentUser = user;
    currentUserId = user.id;
    saveCurrentUserId(user.id);
}

export async function restoreCurrentUser(): Promise<void> {
    if (!currentUserId) {
        return;
    }

    const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", currentUserId)
        .single();

    if (error || !profileData) {
        currentUser = undefined;
        currentUserId = null;
        clearCurrentUserId();
        return;
    }

    currentUser = {
        id: profileData.id,
        username: profileData.username,
        displayName: profileData.display_name,
        bio: profileData.bio,
        birthday: profileData.birthday,
        avatarId: profileData.avatar_id,
        avatarUrl: profileData.avatar_url,
        uploadedAvatars: profileData.uploaded_avatars,
        status: profileData.status,
        createdAt: profileData.created_at,
        updatedAt: profileData.updated_at,
        lastActive: profileData.last_active,
        friends: profileData.friends,
        sentRequests: profileData.sent_requests,
        receivedRequests: profileData.received_requests,
        blockedUsers: profileData.blocked_users,
        reports: profileData.reports,
        roomId: profileData.room_id,
        roomsCreated: profileData.rooms_created,
        roomsVisited: profileData.rooms_visited,
        totalCallMinutes: profileData.total_call_minutes,
        gamesPlayed: profileData.games_played,
        achievementsUnlocked: profileData.achievements_unlocked,
        favoriteTheme: profileData.favorite_theme,
        reputation: profileData.reputation,
    };
}

export function logout(): void {
    currentUser = undefined;
    currentUserId = null;
    clearCurrentUserId();
}

export function isLoggedIn(): boolean {
    return currentUser !== undefined;
}