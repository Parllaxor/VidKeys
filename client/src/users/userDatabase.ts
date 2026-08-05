import { type User, testUser } from "./user"

export const users: User[] = [
    testUser,
]

export function getUserById(id: string): User | undefined {
    return users.find((user) => user.id === id);
}