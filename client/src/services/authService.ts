import { supabase } from "./supabase";
import { type User } from "../users/user";
import bcrypt from "bcryptjs";

export interface ActionResult {
    success: boolean;
    message: string;
}

export type AuthUser = User;

export async function register(
    username: string, displayName: string, birthday: string, password: string,
): Promise<{ result: ActionResult; user?: AuthUser }> {
    const trimmedUsername = username.trim();

    if (!trimmedUsername || !password || !displayName || !birthday) {
        return {
            result: {
                success: false,
                message: "All fields are required.",
            },
        };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { data, error } = await supabase
        .from("auth_accounts")
        .insert({ username: trimmedUsername, password_hash: passwordHash })
        .select("id, username")
        .single();

        if (error) {
            return {
                result: {
                    success: false,
                    message: error.message,
                },
            };
        }

        const { error: profileError } = await supabase
            .from("profiles")
            .insert({ id: data.id,
                    username: trimmedUsername,
                    display_name: displayName.trim(),
                    birthday: birthday 
                });
        
        if (profileError) {
            return {
                result: {
                    success: false,
                    message: profileError.message,
                },
            };
        }

        return {
            result: {
                success: true,
                message: "Account created successfully.",
            },
            user: {
                id: data.id,
                username: data.username,
                displayName: displayName.trim(),
                bio: "",
                birthday: birthday,
                avatarId: "default",
                avatarUrl: null,
                uploadedAvatars: [],
                status: "offline",
                lastActive: Date.now(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                friends: [],
                sentRequests: [],
                receivedRequests: [],
                blockedUsers: [],
                reports: [],
                roomId: null,
                roomsCreated: 0,
                roomsVisited: 0,
                totalCallMinutes: 0,
                gamesPlayed: 0,
                achievementsUnlocked: 0,
                favoriteTheme: "default",
                reputation: 0,
            },
        }
    }

export async function login(
    username: string, password: string
): Promise<{ result: ActionResult; user?: AuthUser }> {
    const trimmedUsername = username.trim();

    const { data, error } = await supabase
        .from("auth_accounts")
        .select("id, username, password_hash")
        .eq("username", trimmedUsername)
        .single();

    console.log("LOGIN ACCOUNT:", data, error);

    if (error || !data) {
        return {
            result: {
                success: false,
                message: "Invalid username or password.",
            },
        };
    }

    const passwordMatches = await bcrypt.compare(password, data.password_hash);

    if (!passwordMatches) {
        return {
            result: {
                success: false,
                message: "Invalid username or password.",
            },
        };
    }

    const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.id)
        .single();

    console.log("LOGIN PROFILE:", profileData, profileError);

    if (profileError || !profileData) {
        return {
            result: {
                success: false,
                message: "Profile not found.",
            },
        };
    }

    return {
        result: {
            success: true,
            message: "Login successful.",
        },
        user: {
            id: profileData.id,
            username: profileData.username,
            displayName: profileData.display_name,
            bio: profileData.bio,
            birthday: profileData.birthday,
            avatarId: profileData.avatar_id,
            avatarUrl: profileData.avatar_url,
            uploadedAvatars: [],
            status: profileData.status,
            lastActive: new Date(profileData.last_active).getTime(),
            createdAt: new Date(profileData.created_at).getTime(),
            updatedAt: new Date(profileData.updated_at).getTime(),
            friends: [],
            sentRequests: [],
            receivedRequests: [],
            blockedUsers: [],
            reports: [],
            roomId: null,
            roomsCreated: profileData.rooms_created,
            roomsVisited: profileData.rooms_visited,
            totalCallMinutes: profileData.total_call_minutes,
            gamesPlayed: profileData.games_played,
            achievementsUnlocked: profileData.achievements_unlocked,
            favoriteTheme: profileData.favorite_theme,
            reputation: profileData.reputation,
        },
    }
}