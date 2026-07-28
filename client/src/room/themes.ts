export interface RoomTheme {
    name: string;
    wallColor: string;
    floorColor: string;
}

export const defaultTheme: RoomTheme = {
    name: "Default",
    wallColor: "#1e293b",
    floorColor: "#334155",
};

export const cozyTheme: RoomTheme = {
    name: "Cozy Cabin",
    wallColor: "#5b4636",
    floorColor: "#8b6a4a",
};

export const cyberTheme: RoomTheme = {
    name: "Cyber",
    wallColor: "#111827",
    floorColor: "#1f2937",
};

export const forestTheme: RoomTheme = {
    name: "Forest",
    wallColor: "#8AA356",
    floorColor: "#495630",
}

export const beachTheme: RoomTheme = {
    name: "Beach",
    wallColor: "#87CEEB",
    floorColor: "#F4D28A",
};

export const themes = [
    defaultTheme,
    cozyTheme,
    cyberTheme,
    forestTheme,
    beachTheme,
];