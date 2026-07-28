import type { Room } from "../room/room";
import { type Dispatch, type SetStateAction } from "react";
import type { RoomPreset } from "../room/presets";

import PresetSelector from "./PresetSelector";
import ThemeSelector from "./ThemeSelector";
import DecorationSelector from "./DecorationSelector";
import AmbienceSelector from "./AmbienceSelector";
import SelectedItemPanel from "./SelectedItemPanel";

interface Props {
    room: Room;
    setRoom: Dispatch<SetStateAction<Room>>;
    presets: RoomPreset[];
    setPresets: Dispatch<SetStateAction<RoomPreset[]>>;
}

function RoomCustomizer ({ room, setRoom, presets, setPresets }: Props) {
    return (
        <section className="mt-6 bg-[#111827] border border-[#2A2E38] rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-white">
                Customize Your Room
            </h2>

            <p className="mt-2 text-slate-400">
                Select themes and decorations
            </p>

            <div className="space-y-8">

                <ThemeSelector
                    room={room}
                    setRoom={setRoom}
                />

                <DecorationSelector 
                    room={room}
                    setRoom={setRoom}
                />

                <AmbienceSelector
                    room={room}
                    setRoom={setRoom}
                />

                <SelectedItemPanel
                    room={room}
                    setRoom={setRoom}
                />

                <PresetSelector
                    room={room}
                    setRoom={setRoom}
                    presets={presets}
                    setPresets={setPresets}
                />

            </div>

        </section>
    );
}

export default RoomCustomizer;