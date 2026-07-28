export interface Ambience {
    name: string;
    overlayColor: string;
    overlayOpacity: number;
}

export const daylight: Ambience = {
    name: "Daylight",
    overlayColor: "#FFFFFF",
    overlayOpacity: 0,
};

export const sunset: Ambience = {
    name: "Sunset",
    overlayColor: "#FF8A65",
    overlayOpacity: 0.15,
};

export const midnight: Ambience = {
    name: "Midnight",
    overlayColor: "#1E3A8A",
    overlayOpacity: 0.35,
};

export const neon: Ambience = {
    name: "Neon",
    overlayColor: "#06B6D4",
    overlayOpacity: 0.12,
};

export const ambiences = [
    daylight,
    sunset,
    midnight,
    neon,
];