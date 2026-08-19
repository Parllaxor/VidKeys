import pancakesAvatar from "../avatars/pancakes.png";

export interface Avatar {
    id: string;
    name: string;
    image: string;
}

export const avatars: Avatar[] = [
    {
        id: "default",
        name: "Default",
        image: "/avatars/default.png"
    },

    {
        id: "robot",
        name: "Robot",
        image: "/avatars/robot.png"
    },

    {
        id: "fox",
        name: "Fox",
        image: "/avatars/fox.png"
    },

    {
        id: "pancakes",
        name: "Pancakes",
        image: pancakesAvatar
    }
]

export function getAvatarById(id: string) {
    return avatars.find((avatar) => avatar.id === id);
}