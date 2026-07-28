import { useState, type Dispatch, type SetStateAction } from "react";
import { ChevronDown } from "lucide-react";

import type { Room } from "../room/room";
import { themes } from "../room/themes";

interface Props {
    room: Room;
    setRoom: Dispatch<SetStateAction<Room>>;
}

function ThemeSelector({ room, setRoom }: Props) {
    const [showThemes, setShowThemes] = useState(false);

    return (
        <>
        <button
            onClick={() => setShowThemes(!showThemes)}
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
            <span className="font-semibold">Themes</span>

            <ChevronDown
                className={`
                    w-5
                    h-5
                    transition-transform
                    duration-200
                    ${showThemes ? "rotate-180" : ""}
                `}
            />
        </button>

        {showThemes && (
            <div className="mt-3 p-4 rounded-xl bg-[#0B0B0F] border border-[#2A2E38] flex flex-colr md:flex-row md:flex-wrap gap-3">
                {themes.map((theme) => (
                    <button
                        key={theme.name}
                        onClick={() => {
                            setRoom({
                                ...room,
                                activePresetId: null,
                                theme: theme,
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
                                room.theme.name === theme.name
                                    ? "bg-cyan-400 text-black"
                                    : "bg-slate-800 text-white hover:bg-cyan-400 hover:text-black"
                            }
                        `}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
        )}

        </>
    );
}

export default ThemeSelector;