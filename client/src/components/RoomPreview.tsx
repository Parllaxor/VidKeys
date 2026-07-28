import DecorationRenderer from "./DecorationRenderer";
import type { Room } from "../room/room";
import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import type { RoomPreset } from "../room/presets";

interface Props {
    room: Room;
    setRoom: Dispatch<SetStateAction<Room>>;
    presets: RoomPreset[];
}

function RoomPreview({ room, setRoom, presets }: Props) {

    const [draggingId, setDraggingId] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({
        x: 0,
        y: 0,
    });
    const [hasDragged, setHasDragged] = useState(false);

    const theme = room.theme;
    const activePreset = presets.find(
        (preset) => preset.id === room.activePresetId
    );

    return (
        <section
            className="
                bg-[#111827]
                border
                border-[#2A2E38]
                rounded-2xl
                p-8
                min-h-[400px]
                flex
                flex-col
                justify-between
            "
        >

            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">
                        Your Room
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Your personal space in VidKeys.
                    </p>
                </div>

                <span
                    className="
                        px-3
                        py-1
                        rounded-full
                        bg-slate-800
                        text-cyan-400
                        text-sm
                    "
                >
                    {activePreset?.name ?? "Custom Room"}
                </span>
            </div>

            <div className="
                mt-8
                flex-1
                rounded-2xl
                border-2
                border-dashed
                border-[#2A2E38]
                bg-[#0B0B0F]
                overflow-hidden
                "
                onClick={() => {
                    if (!hasDragged) {
                        setRoom({
                            ...room,
                            selectedDecorationId: null,
                        });
                    }

                    setHasDragged(false);
                }}
                onMouseMove={(event) => {
                    if (!draggingId) return;

                    setHasDragged(true);

                    const rect = event.currentTarget.getBoundingClientRect();

                    const x = event.clientX - rect.left - dragOffset.x;
                    const y = event.clientY - rect.top - dragOffset.y;

                    setRoom({
                        ...room,
                        activePresetId: null,
                        decorations: room.decorations.map((decoration) =>
                            decoration.id === draggingId
                                ? {
                                    ...decoration,
                                    x,
                                    y,
                                }
                                : decoration
                        ),
                    });
                }}
                onMouseUp={() => {
                    setDraggingId(null);
                }}
                >

                <div className="relative flex flex-col w-full h-[400px]">
                    {/* Wall */}
                    <div className="relative flex-1 rounded-t-xl"
                            style={{
                                backgroundColor: theme.wallColor,
                            }}>
                            
                            {room.decorations.map((decoration) => (
                                <div 
                                    key={decoration.id}
                                    className={`
                                        absolute
                                        rounded-md
                                        ${draggingId === decoration.id ? "cursor-grabbing" : "cursor-grab"}
                                        ${
                                            room.selectedDecorationId === decoration.id
                                                ? "ring-2 ring-cyan-400"
                                                : ""
                                        }
                                    `}
                                    onMouseDown={(event) => {
                                        event.stopPropagation();

                                        setHasDragged(false);
                                        setDraggingId(decoration.id);

                                        setDragOffset({
                                            x: event.nativeEvent.offsetX,
                                            y: event.nativeEvent.offsetY,
                                        });

                                        setRoom({
                                            ...room,
                                            selectedDecorationId: decoration.id,
                                        });
                                    }}
                                    style={{
                                        left: decoration.x,
                                        top: decoration.y,
                                        width: decoration.width,
                                        height: decoration.height,
                                    }}>
                                        <DecorationRenderer decoration={decoration} />
                                </div>
                            ))}

                    </div>

                    {/* Floor */}
                    <div className="h-24 rounded-b-xl"
                            style={{
                                backgroundColor: theme.floorColor,
                            }}>

                    </div>

                    <div className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundColor: room.ambience.overlayColor,
                            opacity: room.ambience.overlayOpacity,
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

export default RoomPreview;