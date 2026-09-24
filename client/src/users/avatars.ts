import defaultAvatar from "../avatars/default.png";
import robotAvatar from "../avatars/robot.png";
import foxAvatar from "../avatars/fox.png";
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
        image: defaultAvatar,
    },
    {
        id: "robot",
        name: "Robot",
        image: robotAvatar,
    },
    {
        id: "fox",
        name: "Fox",
        image: foxAvatar,
    },
    {
        id: "pancakes",
        name: "Pancakes",
        image: pancakesAvatar,
    },
];

export function getAvatarById(id: string) {
    return avatars.find((avatar) => avatar.id === id);
}