import type { AuthUser } from "./auth";
import { loadAuthUsers, saveAuthUsers } from "./authStorage";
import { getAllUsers, createDefaultUser } from "./userDatabase";

let auths: AuthUser[] = loadAuthUsers();

export function getAuthByUserId(userId: string) {
    if (!userId) {
        return;
    }

    return auths.find((auth) => auth.userId === userId);
}

export function createAuth(auth: AuthUser): ActionResult {
    if (auths.some((authUser) => authUser.userId === auth.userId)) {
        return {
            success: false,
            message: "User authentication already exists."
        };
    }
    
    auths.push(auth);
    saveAuthUsers(auths);

    return {
        success: true,
        message: "Authentication created successfully."
    }
}

export function register(username: string, displayName: string, birthday: string, password: string) : ActionResult {
    const users = getAllUsers();
    
    if (users.some((u) => u.username === username)) {
        return {
            success: false,
            message: "Username already in use."
        }
    }

    const newUser = createDefaultUser(username, displayName, birthday);
    if (!newUser) {
        return {
            success: false,
            message: "Account registration failed."
        }
    }
    
    if (!newUser.result.success || !newUser.user) {
        return newUser.result;
    }

    const newAuth: AuthUser = {
        userId: newUser.user.id,
        password: password
    }

    const authResult = createAuth(newAuth);

    if (!authResult.success) {
        return authResult;
    }

    return {
        success: true,
        message: "Account successfully registered!"
    };
}

export interface ActionResult {
    success: boolean;
    message: string;
}