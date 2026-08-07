import { type User, testUser } from "./user"
import { loadUsers, saveUsers } from "./userStorage";

let users: User[] = loadUsers();

if (users.length === 0) {
    users = [testUser];
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
export function createUser(user: User) {
    if (users.some((u) => u.id === user.id)) {
        return;
    }
    
    users.push(user);
    saveUsers(users);
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
        status: "offline",
        lastActive: Date.now(),
        createdAt: Date.now(),
        updatedAt: Date.now(),
        friends: [],
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

{/* Other Utility */}
export function userExists(id: string) {
    return users.some((user) => user.id === id);
}