import { supabase } from "./supabase";

export async function createNotification(
    userId: string,
    type: string,
    message: string,
    data?: Record<string, unknown>
) {
    const { data: notification, error } = await supabase
        .from("notifications")
        .insert({
            user_id: userId,
            type,
            message,
            data: data ?? null,
        })
        .select()
        .single();

    if (error) {
        console.error("Failed to create notification:", error);
        return null;
    }

    return notification;
}

export async function getNotifications(userId: string) {
    const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", userId)
        .order("created_at", { ascending: false });
    
    if (error) {
        console.error("Failed to fetch notifications:", error);
        return [];
    }

    return data;
}