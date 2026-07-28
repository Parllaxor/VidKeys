import { useState, type Dispatch, type SetStateAction } from "react";
import { ChevronDown } from "lucide-react";

import type { Room } from "../room/room";
import { furnitureCatalog, createDecoration } from "../room/decorations";

interface Props {
    room: Room;
    setRoom: Dispatch<SetStateAction<Room>>;
}

function DecorationSelector({ room, setRoom }: Props) {
    const [showFurniture, setShowFurniture] = useState(false);

    return (
        <>
        <button
            onClick={() => setShowFurniture(!showFurniture)}
            className="
                mt-4
                w-full
                flex
                justify-between
                items-center
                bg-slate-800
                text-white
                px-4
                py-3
                rounded-lg
                hover:bg-slate-700
                transition-colors
            "
        >
            <span className="font-semibold">Furniture</span>
            <ChevronDown
                className={`
                    w-5
                    h-5
                    transition-transform
                    duration-200
                    ${showFurniture ? "rotate-180" : ""}
                `}
            />
        </button>

        {showFurniture && (
            <div className="mt-4 flex flex-wrap gap-3">
                {furnitureCatalog.map((item) => (
                    <button
                        key={item.type}
                        onClick={() => {
                            const newDecoration = createDecoration(item.type);

                            setRoom({
                                ...room,
                                activePresetId: null,
                                decorations: [
                                    ...room.decorations,
                                    newDecoration,
                                ],
                                selectedDecorationId: newDecoration.id,
                            });
                        }}
                        className="
                            bg-slate-800
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            hover:bg-cyan-400
                            hover:text-black
                            transition-colors
                        "
                    >
                        {item.type}
                    </button>
                ))}
            </div>
        )}
        </>
    );
}

export default DecorationSelector;