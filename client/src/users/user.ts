export interface User {
    id: string;
    username: string;
    displayName: string;
    bio: string;

    avatarId: string;
    avatarUrl: string | null;
    uploadedAvatars: string[];

    status: "online" | "offline" | "away" | "dnd";

    createdAt: number;
    updatedAt: number;
    lastActive: number;

    friends: string[];
    sentRequests: string[];
    receivedRequests: string[];
    blockedUsers: string[];
    reports: string[];

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
    avatarUrl: null,
    uploadedAvatars: [],

    status: "offline",

    lastActive: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),

    friends: ["test2"],
    sentRequests: [],
    receivedRequests: ["test3"],
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
}

export const testUser2: User = {
    id: "test2",
    username: "testuser2",
    displayName: "Test User 2",
    bio: "This is a second test user.",

    avatarId: "Robot",
    avatarUrl: null,
    uploadedAvatars: [],

    status: "offline",

    lastActive: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),

    friends: ["test"],
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
}

export const testUser3: User = {
    id: "test3",
    username: "testuser3",
    displayName: "Test User 3",
    bio: "This is a third test user.",

    avatarId: "Fox",
    avatarUrl: null,
    uploadedAvatars: [],

    status: "dnd",

    lastActive: Date.now(),
    createdAt: Date.now(),
    updatedAt: Date.now(),

    friends: [],
    sentRequests: ["test"],
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
}