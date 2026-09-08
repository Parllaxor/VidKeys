import { type User } from "./user"
import { supabase } from "../services/supabase";

{/* Friend Utility */}
export async function sendFriendRequest(
    fromUser: User,
    toUser: User
): Promise<ActionResult> {

    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Cannot send friend request to yourself."
        };
    }

    const { data: existingRequest } = await supabase
        .from("friend_requests")
        .select("id")
        .or(
            `and(sender_id.eq.${fromUser.id},receiver_id.eq.${toUser.id}),and(sender_id.eq.${toUser.id},receiver_id.eq.${fromUser.id})`
        )
        .maybeSingle();

    if (existingRequest) {
        return {
            success: false,
            message: "Friend request already exists."
        };
    }

    const { data: existingFriendship } = await supabase
        .from("friendships")
        .select("id")
        .or(
            `and(user_id.eq.${fromUser.id},friend_id.eq.${toUser.id}),and(user_id.eq.${toUser.id},friend_id.eq.${fromUser.id})`
        )
        .maybeSingle();

    if (existingFriendship) {
        return {
            success: false,
            message: "Already friends."
        };
    }

    const { error } = await supabase
        .from("friend_requests")
        .insert({
            sender_id: fromUser.id,
            receiver_id: toUser.id
        });

    if (error) {
        return {
            success: false,
            message: error.message
        };
    }

    return {
        success: true,
        message: `Successfully sent friend request to ${toUser.displayName}!`
    };
}

export async function removeFriendRequests(
    fromUser: User,
    toUser: User
): Promise<ActionResult> {

    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: you should not be able to friend yourself."
        };
    }

    const { error } = await supabase
        .from("friend_requests")
        .delete()
        .or(
            `and(sender_id.eq.${fromUser.id},receiver_id.eq.${toUser.id}),and(sender_id.eq.${toUser.id},receiver_id.eq.${fromUser.id})`
        );

    if (error) {
        return {
            success: false,
            message: error.message
        };
    }

    return {
        success: true,
        message: "Friend request successfully removed."
    };
}

export async function addFriend(
    fromUser: User,
    toUser: User
): Promise<ActionResult> {

    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Cannot friend yourself."
        };
    }

    // Make sure the request actually exists
    const { data: request, error: requestError } = await supabase
        .from("friend_requests")
        .select("id")
        .eq("sender_id", toUser.id)
        .eq("receiver_id", fromUser.id)
        .maybeSingle();

    if (requestError) {
        return {
            success: false,
            message: requestError.message
        };
    }

    if (!request) {
        return {
            success: false,
            message: "Friend request does not exist."
        };
    }

    // Create the friendship in both directions
    const { error: friendshipError } = await supabase
        .from("friendships")
        .insert([
            {
                user_id: fromUser.id,
                friend_id: toUser.id
            },
            {
                user_id: toUser.id,
                friend_id: fromUser.id
            }
        ]);

    if (friendshipError) {
        return {
            success: false,
            message: friendshipError.message
        };
    }

    // Remove the original request
    const { error: deleteError } = await supabase
        .from("friend_requests")
        .delete()
        .eq("id", request.id);

    if (deleteError) {
        return {
            success: false,
            message: deleteError.message
        };
    }

    return {
        success: true,
        message: `You are now friends with ${toUser.displayName}!`
    };
}

export async function removeFriend(
    fromUser: User,
    toUser: User
): Promise<ActionResult> {

    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Cannot remove yourself as a friend."
        };
    }

    const { error } = await supabase
        .from("friendships")
        .delete()
        .or(
            `and(user_id.eq.${fromUser.id},friend_id.eq.${toUser.id}),and(user_id.eq.${toUser.id},friend_id.eq.${fromUser.id})`
        );

    if (error) {
        return {
            success: false,
            message: error.message
        };
    }

    return {
        success: true,
        message: `${toUser.displayName} has been removed from your friends list.`
    };
}

export async function blockUser(
    fromUser: User,
    toUser: User
): Promise<ActionResult> {

    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Cannot block yourself."
        };
    }

    const { data: existingBlock } = await supabase
        .from("blocked_users")
        .select("id")
        .eq("blocker_id", fromUser.id)
        .eq("blocked_id", toUser.id)
        .maybeSingle();

    if (existingBlock) {
        return {
            success: false,
            message: `${toUser.displayName} already blocked.`
        };
    }

    const { error: blockError } = await supabase
        .from("blocked_users")
        .insert({
            blocker_id: fromUser.id,
            blocked_id: toUser.id
        });

    if (blockError) {
        return {
            success: false,
            message: blockError.message
        };
    }

    // Remove any friendship
    await removeFriend(fromUser, toUser);

    // Remove any friend request
    await removeFriendRequests(fromUser, toUser);

    return {
        success: true,
        message: `Successfully blocked ${toUser.displayName}.`
    };
}

export async function removeBlockedUser(
    fromUser: User,
    toUser: User
): Promise<ActionResult> {

    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Should not be possible to block yourself in the first place."
        };
    }

    const { data: existingBlock } = await supabase
        .from("blocked_users")
        .select("id")
        .eq("blocker_id", fromUser.id)
        .eq("blocked_id", toUser.id)
        .maybeSingle();

    if (!existingBlock) {
        return {
            success: false,
            message: `${toUser.displayName} not currently blocked.`
        };
    }

    const { error } = await supabase
        .from("blocked_users")
        .delete()
        .eq("id", existingBlock.id);

    if (error) {
        return {
            success: false,
            message: error.message
        };
    }

    return {
        success: true,
        message: `Successfully unblocked ${toUser.displayName}!`
    };
}

export async function reportUser(
    fromUser: User,
    toUser: User,
    report: string
): Promise<ActionResult> {

    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Cannot report yourself."
        };
    }

    const { error } = await supabase
        .from("user_reports")
        .insert({
            reporter_id: fromUser.id,
            reported_id: toUser.id,
            report
        });

    if (error) {
        return {
            success: false,
            message: error.message
        };
    }

    return {
        success: true,
        message: `Successfully reported ${toUser.displayName}.`
    };
}

export interface ActionResult {
    success: boolean;
    message: string;
}
