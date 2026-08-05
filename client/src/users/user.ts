export interface User {
    id: string;
    username: string;
    displayName: string;
    bio: string;
    avatarId: string;

    status: "online" | "offline" | "away" | "dnd";

    createdAt: number;
    updatedAt: number;
    lastActive: number;

    friends: string[];
    roomId: string | null;

    // VidKeys stats
    roomsCreated: number;
    roomsVisited: number;
    totalCallMinutes: number;
    gamesPlayed: number;
    achievementsUnlocked: number;
    favoriteTheme: string;
    reputation: number;
}

export const testUser: User = {
    id: "test",
    username: "testuser",
    displayName: "Test User",
    bio: "This is a test user.",
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
}