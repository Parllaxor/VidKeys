import { defaultTheme } from "./themes";
import type { RoomTheme } from "./themes";

import { decorations } from "./decorations";
import type { Decoration } from "./decorations";

export interface Room {
    theme: RoomTheme;
    decorations: Decoration[];
}

export const currentRoom: Room = {
    theme: defaultTheme,
    decorations: decorations,
};