export interface Decoration {
    id: string;
    type: "couch" | "window" | "plant";
    x: number;
    y: number;
    width: number;
    height: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
    color: string;
    layer: number;
}

export const couch: Decoration = {
    id: "couch1",
    type: "couch",
    x: 180,
    y: 210,
    width: 120,
    height: 50,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    color: "#475569",
    layer: 10,
};

export const window: Decoration = {
    id: "window1",
    type: "window",
    x: 40,
    y: 40,
    width: 70,
    height: 90,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    color: "#60A5FA",
    layer: 1,
};

export const plant: Decoration = {
    id: "plant1",
    type: "plant",
    x: 60,
    y: 210,
    width: 30,
    height: 80,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
    color: "#13d313",
    layer: 10,
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
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                color: "#475569",
                layer: 10,
            };

        case "window":
            return {
                id,
                type: "window",
                x: spawnX,
                y: spawnY,
                width: 70,
                height: 90,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                color: "#60A5FA",
                layer: 1,
            };

        case "plant":
            return {
                id,
                type: "plant",
                x: spawnX,
                y: spawnY,
                width: 30,
                height: 80,
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                color: "#22C55E",
                layer: 10,
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