import { type User, testUser, testUser2, testUser3 } from "./user"
import { loadUsers, saveUsers } from "./userStorage";

let users: User[] = loadUsers();

if (users.length === 0) {
    users = [testUser, testUser2, testUser3];
    saveUsers(users);
}

{/* Get Users */}
export function getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
}

export function getUserByUsername(username: string): User | undefined {
    return users.find((user) => user.username === username);
}

export function getAllUsers(): User[] {
    return [...users];
}

{/* Update Users */}
export function updateUser(updatedUser: User) {
    users = users.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
    );

    saveUsers(users);
}

{/* Create Users */}
export function createUser(user: User): ActionResult {
    if (users.some((u) => u.id === user.id)) {
        return {
            success: false,
            message: "User ID taken."
        };
    }

    if (users.some((u) => u.username === user.username)) {
        return {
            success: false,
            message: "Username already taken."
        };
    }
    
    users.push(user);
    saveUsers(users);

    return {
        success: true,
        message: `Welcome to VidKeys, ${user.username}!`
    };
}

export function createDefaultUser (
    username: string,
    displayName: string,
    birthday: string,
): {result: ActionResult; user?: User} {
    const user: User = {
        id: crypto.randomUUID(),
        username,
        displayName,
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
    };

    const result = createUser(user);

    if (!result.success) {
        return { result };
    }

    return {
        result,
        user
    };
}

{/* Delete Users */}
export function deleteUser(user: User) {
    if (!users.some((u) => u.id === user.id)) {
        return;
    }

    users = users.filter((u) => u.id !== user.id);
    saveUsers(users);
}

{/* Friend Utility */}
export function sendFriendRequest(fromUser: User, toUser: User) : ActionResult {
    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Cannot send friend request to yourself."
        };
    } else if (!users.some((u) => u.id === fromUser.id) || !users.some((u) => u.id === toUser.id)) {
        return {
            success: false,
            message: "ERROR: User not found."
        };
    } else if (toUser.receivedRequests.includes(fromUser.id) || fromUser.sentRequests.includes(toUser.id)) {
        return {
            success: false,
            message: `Request previously sent to ${toUser}.`
        };
    } else if (fromUser.receivedRequests.includes(toUser.id) || toUser.sentRequests.includes(fromUser.id)) {
        return {
            success: false,
            message: `Request already received from ${toUser}.`
        };
    } else if (fromUser.friends.includes(toUser.id) || toUser.friends.includes(fromUser.id)) {
        return {
            success: false,
            message: `Already friends with ${toUser}.`
        };
    }

    fromUser.sentRequests.push(toUser.id);
    toUser.receivedRequests.push(fromUser.id);

    updateUser(fromUser);
    updateUser(toUser);

    return {
        success: true,
        message: `Successfully sent friend request to ${toUser}!`
    };
}

export function removeFriendRequests(fromUser: User, toUser: User) : ActionResult {
    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: you should not be able to friend yourself."
        };
    }

    if (fromUser.receivedRequests.includes(toUser.id)) {
        fromUser.receivedRequests = fromUser.receivedRequests.filter(
            (friendId) => friendId !== toUser.id);
        toUser.sentRequests = toUser.sentRequests.filter(
            (friendId) => friendId !== fromUser.id);
    } else if (toUser.receivedRequests.includes(fromUser.id)) {
        toUser.receivedRequests = toUser.receivedRequests.filter(
            (friendId) => friendId !== fromUser.id);
        fromUser.sentRequests = fromUser.sentRequests.filter(
            (friendId) => friendId !== toUser.id);
    }

    updateUser(toUser);
    updateUser(fromUser);

    return {
        success: true,
        message: `Friend request from ${toUser} successfully removed.`
    };
}

export function addFriend(fromUser: User, toUser: User) : ActionResult {
    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Cannot friend yourself."
        };
    } else if (fromUser.blockedUsers.includes(toUser.id) || toUser.blockedUsers.includes(fromUser.id)) {
        return {
            success: false,
            message: `${toUser} could not be added as a friend.`
        };
    } else if (!fromUser.receivedRequests.includes(toUser.id) && !toUser.receivedRequests.includes(fromUser.id)) {
        return sendFriendRequest(fromUser, toUser);
    }

    fromUser.friends.push(toUser.id);
    toUser.friends.push(fromUser.id)

    removeFriendRequests(toUser, fromUser);

    updateUser(fromUser);
    updateUser(toUser);

    return {
        success: true,
        message: `Successfully added ${toUser} as a friend!`
    };
}

export function removeFriend(fromUser: User, toUser: User) : ActionResult {
    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Cannot friend yourself."
        };
    } else if (!fromUser.friends.includes(toUser.id) || !toUser.friends.includes(fromUser.id)) {
        return {
            success: false,
            message: `Not currently friends with ${toUser}.`
        };
    }

    fromUser.friends = fromUser.friends.filter(
        (friendId) => friendId !== toUser.id);
    toUser.friends = toUser.friends.filter(
        (friendId) => friendId !== fromUser.id);

    updateUser(fromUser);
    updateUser(toUser);

    return {
        success: true,
        message: `${toUser} has been removed from your friends list.`
    };
}

export function blockUser(fromUser: User, toUser: User) : ActionResult {
    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Cannot block yourself."
        };
    } else if (fromUser.blockedUsers.includes(toUser.id)) {
        return {
            success: false,
            message: `${toUser} already blocked.`
        };
    }

    fromUser.blockedUsers.push(toUser.id);

    removeFriend(fromUser, toUser);
    removeFriendRequests(fromUser, toUser);

    updateUser(toUser);
    updateUser(fromUser);

    return {
        success: true,
        message: `Successfully blocked ${toUser}.`
    };
}

export function removeBlockedUser(fromUser: User, toUser: User) : ActionResult {
    if (fromUser.id === toUser.id) {
        return {
            success: false,
            message: "ERROR: Should not be possible to block yourself in the first place."
        };
    } else if (!fromUser.blockedUsers.includes(toUser.id)) {
        return {
            success: false,
            message: `${toUser} not currently blocked.`
        };
    }

    fromUser.blockedUsers = fromUser.blockedUsers.filter(
        (blockedId) => blockedId !== toUser.id);

    updateUser(fromUser);

    return {
        success: true,
        message: `Successfully unblocked ${toUser}!`
    };
}

export function reportUser(fromUser: User, toUser: User, report: string) {
    toUser.reports.push(fromUser.id + " " + report);

    updateUser(toUser);
}

{/* Other Utility */}
export function userExists(id: string) {
    return users.some((user) => user.id === id);
}

export interface ActionResult {
    success: boolean;
    message: string;
}
