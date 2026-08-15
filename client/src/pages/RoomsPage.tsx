import AppLayout from "../layouts/AppLayout";
import RoomPreview from "../components/RoomPreview";

import { useState, useEffect } from "react";
import { currentRoom } from "../room/room";
import RoomCustomizer from "../components/RoomCustomizer";
import { defaultPresets } from "../room/presets";
import Footer from "../components/Footer";

function RoomsPage() {
    const [presets, setPresets] = useState(() => {
        const savedPresets = localStorage.getItem("vidkeys-presets");

        if (savedPresets) {
            return JSON.parse(savedPresets);
        }

        return defaultPresets;
    });
    const [room, setRoom] = useState(() => {
        const savedRoom = localStorage.getItem("vidkeys-room");

        if (savedRoom) {
            return JSON.parse(savedRoom);
        }

        return currentRoom;
    });

    useEffect(() => {
        localStorage.setItem(
            "vidkeys-room",
            JSON.stringify(room)
        );
    }, [room]);

    useEffect(() => {
        localStorage.setItem(
            "vidkeys-presets",
            JSON.stringify(presets)
        );
    }, [presets]);

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