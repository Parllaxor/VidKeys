import type { Message } from "./message";
import { supabase } from "../services/supabase";

export async function getMessagesBetweenUsers(
    userId1: string,
    userId2: string
): Promise<Message[]> {
    const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
            `and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`
        )
        .order("created_at", { ascending: true });

    if (error) {
        console.error("Failed to load messages:", error);
        return [];
    }

    return data.map((message) => ({
        id: message.id,
        senderId: message.sender_id,
        receiverId: message.receiver_id,
        content: message.content,
        createdAt: new Date(message.created_at).getTime(),
    }));
}

export async function sendMessage(
    senderId: string,
    receiverId: string,
    content: string
): Promise<Message> {
    const { data, error } = await supabase
        .from("messages")
        .insert({
            sender_id: senderId,
            receiver_id: receiverId,
            content,
        })
        .select("*")
        .single();

    if (error || !data) {
        console.error("Failed to send message:", error);
        throw new Error("Failed to send message.");
    }

    return {
        id: data.id,
        senderId: data.sender_id,
        receiverId: data.receiver_id,
        content: data.content,
        createdAt: new Date(data.created_at).getTime(),
    };
}