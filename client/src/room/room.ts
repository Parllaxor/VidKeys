import { defaultTheme } from "./themes";
import type { RoomTheme } from "./themes";

import { daylight } from "./ambience";
import type { Ambience } from "./ambience"

import { decorations } from "./decorations";
import type { Decoration } from "./decorations";

export interface Room {
    roomName: string;
    theme: RoomTheme;
    ambience: Ambience;
    decorations: Decoration[];
    selectedDecorationId: string | null;

    activePresetId: string | null;
}

export const currentRoom: Room = {
    roomName: defaultTheme.name,
    theme: defaultTheme,
    ambience: daylight, 
    decorations: decorations,
    selectedDecorationId: null,

    activePresetId: null,
};