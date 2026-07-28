import { useState, type Dispatch, type SetStateAction } from "react";
import { ChevronDown } from "lucide-react";

import type { Room } from "../room/room";
import type { RoomPreset } from "../room/presets";

interface Props {
    room: Room;
    setRoom: Dispatch<SetStateAction<Room>>;
    presets: RoomPreset[];
    setPresets: Dispatch<SetStateAction<RoomPreset[]>>;
}

function PresetSelector({ room, setRoom, presets, setPresets }: Props) {
    const [showPresets, setShowPresets] = useState(false);

    return (
        <>
        <button
            onClick={() => setShowPresets(!showPresets)}
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
                Presets
            </span>

            <ChevronDown
                className={`
                    w-5
                    h-5
                    transition-transform
                    duration-200
                    ${showPresets ? "rotate-180" : ""}
                `}
            />
        </button>

        {showPresets && (
            <div className="mt-3 p-4 rounded-xl bg-[#0B0B0F] border border-[#2A2E38] flex flex-col md:flex-row md:flex-wrap gap-3">
                {presets.map((preset) => (
                    <button
                        key={preset.id}
                        onClick={() => {
                            setRoom({
                                ...structuredClone(preset.room),
                                activePresetId: preset.id,
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
                                room.activePresetId === preset.id
                                    ? "bg-cyan-400 text-black"
                                    : "bg-slate-800 text-white hover:bg-cyan-400 hover:text-black"
                            }
                        `}
                    >
                        {preset.name}
                    </button>
                ))}
            </div>
        )}

        <button
            onClick={() => {
                let name = prompt("Preset Name")?.trim();

                if (presets.some((preset) => preset.name === name)) {
                    alert("A preset with that name already exists.");
                    return;
                }

                if (!name) {
                    let num = 1;

                    while (
                        presets.some(
                            (preset) => preset.name === `Preset${num}`
                        )
                    ) {
                        num++;
                    }

                    name=`Preset${num}`;
                }

                const newPreset = {
                    id: crypto.randomUUID(),
                    name,
                    room: structuredClone(room),
                };

                setPresets([
                    ...presets,
                    newPreset,
                ]);
            }}
            className="
                mt-4
                w-full
                bg-cyan-400
                hover:bg-cyan-300
                text-black
                font-semibold
                py-3
                rounded-lg
                transition-colors
            "
        >
            Save Current Preset
        </button>
        </>
    );
}

export default PresetSelector;