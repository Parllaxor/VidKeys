import type { Decoration } from "../room/decorations";
import type { Room } from "../room/room";
import type { Dispatch, SetStateAction } from "react";
import { useState, useEffect, type RefObject } from "react";

interface Props {
    decoration: Decoration;
    selected: boolean;
    room: Room;
    setRoom: Dispatch<SetStateAction<Room>>;
    roomRef: RefObject<HTMLDivElement | null>;
}

function SelectionOutline({ decoration, selected, room, setRoom, roomRef }: Props) {

    //const HANDLE_SIZE = 12;
    const [rotating, setRotating] = useState(false);
    const [scaling, setScaling] = useState(false);
    const [scalingHandle, setScalingHandle] = useState<
        "tl" | "tr" | "bl" | "br" | null
    >(null);

    useEffect(() => {
        if (!rotating && !scaling) return;

        function handleMouseMove(event: MouseEvent) {
            const rect = roomRef.current?.getBoundingClientRect();

            if (!rect) return;

            const centerX = rect.left + decoration.x + decoration.width / 2;
            const centerY = rect.top + decoration.y + decoration.height / 2;

            const dx = event.clientX - centerX;
            const dy = event.clientY - centerY;

            const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

            if (rotating) {
                setRoom({
                    ...room,
                    activePresetId: null,
                    decorations: room.decorations.map((d) =>
                        d.id === decoration.id ? { ...d, rotation: angle } : d
                    ),
                });
            }
            if (scaling) {
                setRoom({
                    ...room,
                    activePresetId: null,
                    decorations: room.decorations.map((d) => {
                        if (d.id !== decoration.id) return d;

                        let adjustedDx = dx;
                        let adjustedDy = dy;

                        if (scalingHandle === "bl" || scalingHandle === "tl") {
                            adjustedDx = -dx;
                        }

                        if (scalingHandle === "tr" || scalingHandle === "tl") {
                            adjustedDy = -dy;
                        }

                        const scaleX = Math.max(0.1, adjustedDx / (d.width / 2));
                        const scaleY = Math.max(0.1, adjustedDy / (d.height / 2));

                        return {
                            ...d,
                            scaleX,
                            scaleY,
                        };
                    })
                });
            }
        }

        function handleMouseUp() {
            setRotating(false);
            setScaling(false);
            setScalingHandle(null);
        }

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [rotating, scaling]);

    if (!selected) return null;

    return (
        <>
            {/* Border */}
            <div className="absolute inset-0 border-2 border-cyan-400 pointer-events-none" />

            {/* Top-left corner */}
            <div
                className="
                    absolute
                    w-3
                    h-3
                    bg-cyan-400
                    border
                    border-white
                    cursor-nwse-resize
                "
                style={{
                    left: "-6px",
                    top: "-6px",
                }}
                onMouseDown={(event) => {
                    event.stopPropagation();
                    setScaling(true);
                    setScalingHandle("tl");
                }}
            />

            {/* Top-right corner */}
            <div
                className="
                    absolute
                    w-3
                    h-3
                    bg-cyan-400
                    border
                    border-white
                    cursor-nesw-resize
                "
                style={{
                    right: "-6px",
                    top: "-6px",
                }}
                onMouseDown={(event) => {
                    event.stopPropagation();
                    setScaling(true);
                    setScalingHandle("tr");
                }}
            />

            {/* Bottom-left corner */}
            <div
                className="
                    absolute
                    w-3
                    h-3
                    bg-cyan-400
                    border
                    border-white
                    cursor-nesw-resize
                "
                style={{
                    left: "-6px",
                    bottom: "-6px",
                }}
                onMouseDown={(event) => {
                    event.stopPropagation();
                    setScaling(true);
                    setScalingHandle("bl");
                }}
            />

            {/* Bottom-right corner */}
            <div
                className="
                    absolute
                    w-3
                    h-3
                    bg-cyan-400
                    border
                    border-white
                    cursor-nwse-resize
                "
                style={{
                    right: "-6px",
                    bottom: "-6px",
                }}
                onMouseDown={(event) => {
                    event.stopPropagation();
                    setScaling(true);
                    setScalingHandle("br");
                }}
            />

            {/* Rotation line */}
            <div
                className="absolute bg-cyan-400"
                style={{
                    width: "2px",
                    height: "20px",
                    left: "50%",
                    top: "-20px",
                    transform: "translateX(-50%)",
                }}
            />

            {/* Rotation handle */}
            <div
                className="
                    absolute
                    w-4
                    h-4
                    rounded-full
                    bg-cyan-400
                    border-2
                    border-white
                    cursor-grab
                "
                style={{
                    left: "50%",
                    top: "-28px",
                    transform: "translateX(-50%)",
                }}
                onMouseDown={(event) => {
                    event.stopPropagation();
                    setRotating(true);
                }}
            />
        </>
    );
}

export default SelectionOutline;