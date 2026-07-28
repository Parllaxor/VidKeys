import type { Room } from "./room";
import { currentRoom } from "./room";

import { cozyTheme } from "./themes";
import { sunset } from "./ambience";
import { couch, plant } from "./decorations";

export interface RoomPreset {
    id: string;
    name: string;
    room: Room;
}

export const starterPreset: RoomPreset = {
    id: "starter",
    name: "Starter Room",
    room: currentRoom,
};

export const cozyPreset: RoomPreset = {
    id: "cozy",
    name: "Cozy Living Room",
    room: {
        roomName: cozyTheme.name,
        theme: cozyTheme,
        ambience: sunset,
        decorations: [
            couch,
            plant,
        ],
        selectedDecorationId: null,
        activePresetId: "cozy",
    },
};

export const defaultPresets = [
    starterPreset,
    cozyPreset,
]