import type { User } from "./user";
import { supabase } from "../services/supabase";
import bcrypt from "bcryptjs";

export interface ActionResult {
    success: boolean;
    message: string;
}

export async function register(
    username: string,
    displayName: string,
    birthday: string,
    password: string
): Promise<{ result: ActionResult; user?: User }> {

    const trimmedUsername = username.trim();
    const trimmedDisplayName = displayName.trim();

    if (!trimmedUsername || !trimmedDisplayName || !birthday || !password) {
        return {
            result: {
                success: false,
                message: "All fields are required.",
            },
        };
    }

    const { data: existingUser, error: lookupError } = await supabase
        .from("profiles")
        .select("id")
        .eq("username", trimmedUsername)
        .maybeSingle();

    if (lookupError) {
        console.error("Failed to check username:", lookupError);

        return {
            result: {
                success: false,
                message: "Failed to check username.",
            },
        };
    }

    if (existingUser) {
        return {
            result: {
                success: false,
                message: "Username already in use.",
            },
        };
    }

    const userId = crypto.randomUUID();

    const passwordHash = await bcrypt.hash(password, 10);

    const { error: authError } = await supabase
        .from("auth_accounts")
        .insert({
            id: userId,
            username: trimmedUsername,
            password_hash: passwordHash,
        });

    if (authError) {
        console.error("Failed to create authentication account:", authError);

        return {
            result: {
                success: false,
                message: "Failed to create account.",
            },
        };
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .insert({
            id: userId,
            username: trimmedUsername,
            display_name: trimmedDisplayName,
            birthday,
        })
        .select("*")
        .single();

    if (profileError || !profile) {
        console.error("Failed to create profile:", profileError);

        await supabase
            .from("auth_accounts")
            .delete()
            .eq("id", userId);

        return {
            result: {
                success: false,
                message: "Failed to create profile.",
            },
        };
    }

    const user: User = {
        id: profile.id,
        username: profile.username,
        displayName: profile.display_name,
        bio: profile.bio,
        birthday: profile.birthday,
        avatarId: profile.avatar_id,
        avatarUrl: profile.avatar_url,
        uploadedAvatars: [],
        status: profile.status,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
        lastActive: profile.last_active,
        friends: [],
        sentRequests: [],
        receivedRequests: [],
        blockedUsers: [],
        reports: [],
        roomId: null,
        roomsCreated: profile.rooms_created,
        roomsVisited: profile.rooms_visited,
        totalCallMinutes: profile.total_call_minutes,
        gamesPlayed: profile.games_played,
        achievementsUnlocked: profile.achievements_unlocked,
        favoriteTheme: profile.favorite_theme,
        reputation: profile.reputation,
    };

    return {
        result: {
            success: true,
            message: "Account successfully registered!",
        },
        user,
    };
}

export async function login(
    username: string,
    password: string
): Promise<{ result: ActionResult; user?: User }> {

    const trimmedUsername = username.trim();

    const { data: auth, error: authError } = await supabase
        .from("auth_accounts")
        .select("*")
        .eq("username", trimmedUsername)
        .maybeSingle();

    if (authError || !auth) {
        return {
            result: {
                success: false,
                message: "Invalid username or password.",
            },
        };
    }

    const passwordMatches = await bcrypt.compare(
        password,
        auth.password_hash
    );

    if (!passwordMatches) {
        return {
            result: {
                success: false,
                message: "Invalid username or password.",
            },
        };
    }

    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", auth.id)
        .single();

    if (profileError || !profile) {
        console.error("Failed to load profile:", profileError);

        return {
            result: {
                success: false,
                message: "Failed to load user profile.",
            },
        };
    }

    const user: User = {
        id: profile.id,
        username: profile.username,
        displayName: profile.display_name,
        bio: profile.bio,
        birthday: profile.birthday,
        avatarId: profile.avatar_id,
        avatarUrl: profile.avatar_url,
        uploadedAvatars: [],
        status: profile.status,
        createdAt: profile.created_at,
        updatedAt: profile.updated_at,
        lastActive: profile.last_active,
        friends: [],
        sentRequests: [],
        receivedRequests: [],
        blockedUsers: [],
        reports: [],
        roomId: null,
        roomsCreated: profile.rooms_created,
        roomsVisited: profile.rooms_visited,
        totalCallMinutes: profile.total_call_minutes,
        gamesPlayed: profile.games_played,
        achievementsUnlocked: profile.achievements_unlocked,
        favoriteTheme: profile.favorite_theme,
        reputation: profile.reputation,
    };

    return {
        result: {
            success: true,
            message: "Successfully logged in.",
        },
        user,
    };
}