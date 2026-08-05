import DecorationRenderer from "./DecorationRenderer";
import SelectionOutline from "./SelectionOutline";
import type { Room } from "../room/room";
import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect, useRef } from "react";
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
    const roomRef = useRef<HTMLDivElement | null>(null);

    const theme = room.theme;
    const activePreset = presets.find(
        (preset) => preset.id === room.activePresetId
    );
    const wallDecorations = room.decorations.filter(
        (decoration) => decoration.layer <= 3
    );
    const furniture = room.decorations.filter(
        (decoration) => decoration.layer > 3
    );

    useEffect(() => {
        const roomElement = roomRef.current;

        if (!roomElement) return;

        function handleWheel(event: WheelEvent) {
            
            event.preventDefault();
            const rotationAmount = event.deltaY < 0 ? 2 : -2;

            setRoom((currentRoom) => {
                if (!currentRoom.selectedDecorationId) {
                    return currentRoom;
                }

            return {
                    ...currentRoom,
                activePresetId: null,
                decorations: currentRoom.decorations.map((decoration) =>
                    decoration.id === currentRoom.selectedDecorationId
                        ? {
                            ...decoration,
                            rotation: decoration.rotation + rotationAmount,
                        }
                        : decoration
                    )
                };
            });
        }

        roomElement.addEventListener("wheel", handleWheel, {
            passive: false,
        });

        return () => {
            roomElement.removeEventListener("wheel", handleWheel);
        };

    }, [setRoom]);

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
                ref={roomRef}
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
                }} >

                <div className="relative flex flex-col w-full h-[400px]">
                    {/* Wall */}
                    <div className="relative flex-1 rounded-t-xl"
                            style={{
                                backgroundColor: theme.wallColor,
                                filter: `brightness(${room.ambience.wallBrightness})`,
                            }}>

                            {wallDecorations.map((window) => (
                                <div
                                    key={`${window.id}-glow`}
                                    className="absolute pointer-events-none z-0"
                                    style={{
                                        left: window.x - 60,
                                        top: window.y - 40,
                                        width: window.width + 120,
                                        height: window.height + 180,
                                        background: `radial-gradient(
                                            ellipse at center top,
                                            ${room.ambience.glowColor} 0%,
                                            transparent 70%
                                        )`,
                                        opacity: room.ambience.glowOpacity,
                                    }}
                                />
                            ))}

                            {wallDecorations.map((decoration) => (
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
                                        transform: `rotate(${decoration.rotation}deg)
                                                    scale(${decoration.scaleX}, ${decoration.scaleY})`,
                                    }}
                                >
                                    <DecorationRenderer decoration={decoration} />

                                    <SelectionOutline
                                        decoration={decoration}
                                        selected={room.selectedDecorationId === decoration.id}
                                        room={room}
                                        setRoom={setRoom}
                                        roomRef={roomRef}
                                    />
                                </div>
                            ))}

                    </div>

                    {/* Floor */}
                    <div className="h-24 rounded-b-xl"
                            style={{
                                backgroundColor: theme.floorColor,
                                filter: `brightness(${room.ambience.floorBrightness})`,
                            }}>
                    </div>

                    {/* Decorations */}
                    {furniture.map((decoration) => (
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
                            }}>

                            <div className="absolute"
                                style={{
                                    left: decoration.x,
                                    top: decoration.y,
                                    width: decoration.width,
                                    height: decoration.height,
                                    zIndex: decoration.layer,
                                    transform: `rotate(${decoration.rotation}deg)
                                                scale(${decoration.scaleX}, ${decoration.scaleY})
                                                `,
                                }}>
                                    <DecorationRenderer decoration={decoration} />
                            
                                    <SelectionOutline 
                                        decoration={decoration}
                                        selected={room.selectedDecorationId === decoration.id}
                                        room={room}
                                        setRoom={setRoom}
                                        roomRef={roomRef}
                                    />
                            </div>
                        </div>
                    ))}

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