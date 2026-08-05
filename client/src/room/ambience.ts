export interface Ambience {
    name: string;
    overlayColor: string;
    overlayOpacity: number;

    wallBrightness: number;
    floorBrightness: number;

    vignetteOpacity: number;

    glowColor: string;
    glowOpacity: number;
}

export const daylight: Ambience = {
    name: "Daylight",
    overlayColor: "#FFFFFF",
    overlayOpacity: 0,

    wallBrightness: 1,
    floorBrightness: 0.9,

    vignetteOpacity: 1,

    glowColor: "#FFF8E1",
    glowOpacity: 0.25,
};

export const sunset: Ambience = {
    name: "Sunset",
    overlayColor: "#FF8A65",
    overlayOpacity: 0.15,

    wallBrightness: 0.85,
    floorBrightness: 0.75,

    vignetteOpacity: 1,

    glowColor: "#FFB74D",
    glowOpacity: 0.35,
};

export const midnight: Ambience = {
    name: "Midnight",
    overlayColor: "#0088f8",
    overlayOpacity: 0.35,

    wallBrightness: 0.45,
    floorBrightness: 0.35,

    vignetteOpacity: 1,

    glowColor: "#2c5d74",
    glowOpacity: 0.2,
};

export const neon: Ambience = {
    name: "Neon",
    overlayColor: "#06B6D4",
    overlayOpacity: 0.12,

    wallBrightness: 0.8,
    floorBrightness: 0.9,

    vignetteOpacity: 1,

    glowColor: "#22D3EE",
    glowOpacity: 0.45,
};

export const ambiences = [
    daylight,
    sunset,
    midnight,
    neon,
];