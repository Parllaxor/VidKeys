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
    y: 210,
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

export const plant: Decoration = {
    id: "plant1",
    type: "plant",
    x: 60,
    y: 210,
    width: 30,
    height: 80,
    color: "#13d313",
};

export function createDecoration(
    type: Decoration["type"]
): Decoration {

    const id = crypto.randomUUID();

    const spawnX = 100 + Math.random() * 80;
    const spawnY = 100 + Math.random() * 80;

    switch (type) {
        case "couch":
            return {
                id,
                type: "couch",
                x: spawnX,
                y: spawnY,
                width: 120,
                height: 50,
                color: "#475569",
            };

        case "window":
            return {
                id,
                type: "window",
                x: spawnX,
                y: spawnY,
                width: 70,
                height: 90,
                color: "#60A5FA",
            };

        case "plant":
            return {
                id,
                type: "plant",
                x: spawnX,
                y: spawnY,
                width: 30,
                height: 80,
                color: "#22C55E",
            };
    }
}

export const furnitureCatalog = [
    couch,
    window,
    plant,
];

export const decorations = [
    couch,
    window,
    plant,
];