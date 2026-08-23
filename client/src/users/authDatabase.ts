import type { AuthUser } from "./auth";
import type { User } from "./user";
import { loadAuthUsers, saveAuthUsers } from "./authStorage";
import { getAllUsers, createDefaultUser, getUserByUsername } from "./userDatabase";

let auths: AuthUser[] = loadAuthUsers();

export interface ActionResult {
    success: boolean;
    message: string;
}

export function getAuthByUserId(userId: string): AuthUser | undefined {
    if (!userId) {
        return undefined;
    }

    return auths.find((auth) => auth.userId === userId);
}

export function createAuth(auth: AuthUser): ActionResult {
    if (auths.some((authUser) => authUser.userId === auth.userId)) {
        return {
            success: false,
            message: "User authentication already exists.",
        };
    }

    auths.push(auth);
    saveAuthUsers(auths);

    return {
        success: true,
        message: "Authentication created successfully.",
    };
}

export function register(
    username: string,
    displayName: string,
    birthday: string,
    password: string
): { result: ActionResult; user?: User } {
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

    if (getAllUsers().some((user) => user.username === trimmedUsername)) {
        return {
            result: {
                success: false,
                message: "Username already in use.",
            },
        };
    }

    const newUser = createDefaultUser(trimmedUsername, trimmedDisplayName, birthday);

    if (!newUser.result.success || !newUser.user) {
        return {
            result: newUser.result,
        };
    }

    const authResult = createAuth({
        userId: newUser.user.id,
        password,
    });

    if (!authResult.success) {
        return {
            result: authResult,
        };
    }

    return {
        result: {
            success: true,
            message: "Account successfully registered!",
        },
        user: newUser.user,
    };
}

export function login(username: string, password: string): { result: ActionResult; user?: User } {
    const user = getUserByUsername(username.trim());

    if (!user) {
        return {
            result: {
                success: false,
                message: "Invalid username or password.",
            },
        };
    }

    const auth = getAuthByUserId(user.id);

    if (!auth || auth.password !== password) {
        return {
            result: {
                success: false,
                message: "Invalid username or password.",
            },
        };
    }

    return {
        result: {
            success: true,
            message: "Successfully logged in.",
        },
        user,
    };
}
