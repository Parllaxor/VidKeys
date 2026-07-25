import DecorationRenderer from "./DecorationRenderer";
import type { Room } from "../room/room";

interface Props {
    room: Room;
}

function RoomPreview({ room }: Props) {

    const theme = room.theme;

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
                    {theme.name}
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
            ">
                <div className="flex flex-col w-full h-[350px]">
                    {/* Wall */}
                    <div className="relative flex-1 rounded-t-xl"
                            style={{
                                backgroundColor: theme.wallColor,
                            }}>
                            
                            {room.decorations.map((decoration) => (
                                <div key={decoration.id}
                                    className="absolute"
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
                </div>
            </div>
        </section>
    );
}

export default RoomPreview;