import { useState, type Dispatch, type SetStateAction } from "react";
import { ChevronDown } from "lucide-react";

import type { Room } from "../room/room";
import { ambiences } from "../room/ambience";

interface Props {
    room: Room;
    setRoom: Dispatch<SetStateAction<Room>>;
}

function AmbienceSelector({ room, setRoom }: Props) {
    const [showAmbience, setShowAmbience] = useState(false);

    return (
        <>
        <button
            onClick={() => setShowAmbience(!showAmbience)}
            className="
                mt-8
                w-full
                flex
                items-center
                justify-between
                px-4
                py-3
                rounded-xl
                bg-slate-800
                border
                border-[#2A2E38]
                text-white
                hover:border-cyan-400
                hover:bg-slate-700
                transition-all
            "
        >
            <span className="font-semibold">
                Ambience
            </span>

            <ChevronDown
                className={`
                    w-5
                    h-5
                    transition-transform
                    duration-200
                    ${showAmbience ? "rotate-180" : ""}
                `}
            />
        </button>

        {showAmbience && (
            <div className="mt-3 p-4 rounded-xl bg-[#0B0B0F] border border-[#2A2E38] flex flex-col md:flex-row md:flex-wrap gap-3">
                {ambiences.map((ambience) => (
                    <button
                        key={ambience.name}
                        onClick={() => {
                            setRoom({
                                ...room,
                                activePresetId: null,
                                ambience,
                            });
                        }}
                        className={`
                            w-full
                            md:w-auto
                            px-4
                            py-2
                            rounded-lg
                            transition-colors
                            ${
                                room.ambience.name === ambience.name
                                    ? "bg-cyan-400 text-black"
                                    : "bg-slate-800 text-white hover:bg-cyan-400 hover:text-black"
                            }
                        `}
                    >
                        {ambience.name}
                    </button>
                ))}
            </div>
        )}
        </>
    );
}

export default AmbienceSelector;