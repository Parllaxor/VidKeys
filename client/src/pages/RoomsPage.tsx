import AppLayout from "../layouts/AppLayout";
import RoomPreview from "../components/RoomPreview";

import { useState } from "react";
import { currentRoom } from "../room/room";
import { cozyTheme } from "../room/themes";

function RoomsPage() {
    const [room, setRoom] = useState(currentRoom);

    return (
        <AppLayout>
            <div className="py-8">
                <h1 className="text-3xl font-bold text-white">
                    Rooms
                </h1>

                <p className="mt-2 text-slate-400">
                    Create, customize, and explore your spaces.
                </p>

                <div className="mt-8">
                    <RoomPreview room={room} />
                </div>

                <div className="mt-6">
                    <button
                        onClick={() => {
                            setRoom({
                                ...room,
                                theme: cozyTheme,
                            });
                        }}
                        className="
                            bg-cyan-400
                            text-black
                            px-4
                            py-2
                            rounded-lg
                        "
                    >
                        Change Theme
                    </button>
                </div>
            </div>
        </AppLayout>
    );
}

export default RoomsPage;