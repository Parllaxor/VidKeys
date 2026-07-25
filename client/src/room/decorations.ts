export interface Decoration {
    id: string;
    type: "couch" | "window" | "plant";
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
}

export const couch: Decoration = {
    id: "couch1",
    type: "couch",
    x: 180,
    y: 180,
    width: 120,
    height: 50,
    color: "#475569",
};

export const window: Decoration = {
    id: "window1",
    type: "window",
    x: 40,
    y: 40,
    width: 70,
    height: 90,
    color: "#60A5FA",
};

export const decorations = [
    couch,
    window,
]