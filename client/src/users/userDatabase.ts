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

export function createDefaultUser(
    username: string,
    displayName: string
): User {
    const user: User = {
        id: crypto.randomUUID(),
        username,
        displayName,
        bio: "",
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

    createUser(user);

    return user;
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
export function sendFriendRequest(fromUser: User, toUser: User) {
    if (fromUser.id === toUser.id) {
        return;
    } else if (!users.some((u) => u.id === fromUser.id) || !users.some((u) => u.id === toUser.id)) {
        return;
    } else if (toUser.receivedRequests.includes(fromUser.id) || fromUser.sentRequests.includes(toUser.id)) {
        return;
    } else if (fromUser.receivedRequests.includes(toUser.id) || toUser.sentRequests.includes(fromUser.id)) {
        return;
    } else if (fromUser.friends.includes(toUser.id) || toUser.friends.includes(fromUser.id)) {
        return;
    }

    fromUser.sentRequests.push(toUser.id);
    toUser.receivedRequests.push(fromUser.id);

    updateUser(fromUser);
    updateUser(toUser);
}

export function removeFriendRequests(fromUser: User, toUser: User) {
    if (fromUser.id === toUser.id) {
        return;
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
}

export function addFriend(fromUser: User, toUser: User) {
    if (fromUser.id === toUser.id) {
        return;
    } else if (fromUser.blockedUsers.includes(toUser.id) || toUser.blockedUsers.includes(fromUser.id)) {
        return;
    } else if (!fromUser.receivedRequests.includes(toUser.id) && !toUser.receivedRequests.includes(fromUser.id)) {
        sendFriendRequest(fromUser, toUser);
        return;
    }

    fromUser.friends.push(toUser.id);
    toUser.friends.push(fromUser.id)

    removeFriendRequests(toUser, fromUser);

    updateUser(fromUser);
    updateUser(toUser);
}

export function removeFriend(fromUser: User, toUser: User) {
    if (fromUser.id === toUser.id) {
        return;
    } else if (!fromUser.friends.includes(toUser.id) || !toUser.friends.includes(fromUser.id)) {
        return;
    }

    fromUser.friends = fromUser.friends.filter(
        (friendId) => friendId !== toUser.id);
    toUser.friends = toUser.friends.filter(
        (friendId) => friendId !== fromUser.id);

    updateUser(fromUser);
    updateUser(toUser);
}

export function blockUser(fromUser: User, toUser: User) {
    if (fromUser.id === toUser.id) {
        return;
    } else if (fromUser.blockedUsers.includes(toUser.id)) {
        return;
    }

    fromUser.blockedUsers.push(toUser.id);

    removeFriend(fromUser, toUser);
    removeFriendRequests(fromUser, toUser);

    updateUser(toUser);
    updateUser(fromUser);
}

export function removeBlockedUser(fromUser: User, toUser: User) {
    if (fromUser.id === toUser.id) {
        return;
    } else if (!fromUser.blockedUsers.includes(toUser.id)) {
        return
    }

    fromUser.blockedUsers = fromUser.blockedUsers.filter(
        (blockedId) => blockedId !== toUser.id);

    updateUser(fromUser);
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