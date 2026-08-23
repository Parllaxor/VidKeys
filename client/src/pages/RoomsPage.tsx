import AppLayout from "../layouts/AppLayout";
import RoomPreview from "../components/RoomPreview";
import { useState, useEffect } from "react";
import { currentRoom } from "../room/room";
import RoomCustomizer from "../components/RoomCustomizer";
import { defaultPresets } from "../room/presets";
import Footer from "../components/Footer";
import { getCurrentUser } from "../users/currentUser";
import { updateUser } from "../users/userDatabase";

function RoomsPage() {
    const currentUser = getCurrentUser();
    const userId = currentUser?.id;
    const roomStorageKey = userId ? `vidkeys-room-${userId}` : "vidkeys-room-guest";
    const presetStorageKey = userId ? `vidkeys-presets-${userId}` : "vidkeys-presets-guest";

    const [presets, setPresets] = useState(() => {
        const savedPresets = localStorage.getItem(presetStorageKey);

        if (savedPresets) {
            return JSON.parse(savedPresets);
        }

        return defaultPresets;
    });

    const [room, setRoom] = useState(() => {
        const savedRoom = localStorage.getItem(roomStorageKey);

        if (savedRoom) {
            return JSON.parse(savedRoom);
        }

        return currentRoom;
    });

    useEffect(() => {
        localStorage.setItem(roomStorageKey, JSON.stringify(room));

        if (currentUser && currentUser.roomId !== room.roomName) {
            updateUser({
                ...currentUser,
                roomId: room.roomName,
                updatedAt: Date.now(),
            });
        }
    }, [currentUser, room, roomStorageKey]);

    useEffect(() => {
        localStorage.setItem(presetStorageKey, JSON.stringify(presets));
    }, [presets, presetStorageKey]);

    if (!currentUser) {
        return (
            <AppLayout>
                <div className="py-8 text-slate-300">Please log in to manage your room.</div>
            </AppLayout>
        );
    }

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
                    <RoomPreview
                        room={room}
                        setRoom={setRoom}
                        presets={presets}
                    />
                </div>

                <div className="mt-6">
                    <RoomCustomizer
                        room={room}
                        setRoom={setRoom}
                        presets={presets}
                        setPresets={setPresets}
                    />
                </div>
            </div>

            <Footer />
        </AppLayout>
    );
}

export default RoomsPage;
