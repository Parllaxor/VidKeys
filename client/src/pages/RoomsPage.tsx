import AppLayout from "../layouts/AppLayout";
import RoomPreview from "../components/RoomPreview";
import { useState, useEffect } from "react";
import { currentRoom } from "../room/room";
import RoomCustomizer from "../components/RoomCustomizer";
import { defaultPresets } from "../room/presets";
import Footer from "../components/Footer";
import { getCurrentUser } from "../users/currentUser";
import { supabase } from "../services/supabase";

function RoomsPage() {
    const currentUser = getCurrentUser();
    const userId = currentUser?.id;
    const roomStorageKey = userId ? `vidkeys-room-${userId}` : "vidkeys-room-guest";

    const [presets, setPresets] = useState(defaultPresets);

    const [room, setRoom] = useState(() => {
        const savedRoom = localStorage.getItem(roomStorageKey);

        if (savedRoom) {
            return JSON.parse(savedRoom);
        }

        return currentRoom;
    });

    useEffect(() => {
        if (!currentUser) return;

        async function loadPresets() {
            const { data, error } = await supabase
                .from("room_presets")
                .select("id, name, room_data")
                .eq("owner_id", currentUser?.id);

            if (error) {
                console.error("Failed to load presets:", error);
                return;
            }

            if (data && data.length > 0) {
                setPresets(
                    data.map((preset) => ({
                        id: preset.id,
                        name: preset.name,
                        room: preset.room_data,
                    }))
                );
            }
        }

        loadPresets();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) return;

        async function loadRoom() {
            const { data, error } = await supabase
                .from("rooms")
                .select("id, room_data")
                .eq("owner_id", currentUser?.id)
                .maybeSingle();

            if (error) {
                console.error("Failed to load room:", error);
                return;
            }

            if (data?.room_data) {
                setRoom(data.room_data);
            }
        }

        loadRoom();
    }, [currentUser]);

    useEffect(() => {
        if (!currentUser) return;

        localStorage.setItem(roomStorageKey, JSON.stringify(room));

        async function saveRoom() {
            const { data: existingRoom, error: findError } = await supabase
                .from("rooms")
                .select("id")
                .eq("owner_id", currentUser?.id)
                .maybeSingle();

            if (findError) {
                console.error("Failed to find room:", findError);
                return;
            }

            if (existingRoom) {
                const { error } = await supabase
                    .from("rooms")
                    .update({
                        room_name: room.roomName,
                        room_data: room,
                        theme: room.theme,
                        ambience: room.ambience,
                        decorations: room.decorations,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", existingRoom.id);

                if (error) {
                    console.error("Failed to update room:", error);
                }

            } else {
                const { data, error } = await supabase
                    .from("rooms")
                    .insert({
                        owner_id: currentUser?.id,
                        room_name: room.roomName,
                        room_data: room,
                        theme: room.theme,
                        ambience: room.ambience,
                        decorations: room.decorations,
                    })
                    .select("id")
                    .single();

                if (error) {
                    console.error("Failed to create room:", error);
                    return;
                }

                const { error: profileError } = await supabase
                    .from("profiles")
                    .update({
                        room_id: data.id,
                        updated_at: new Date().toISOString(),
                    })
                    .eq("id", currentUser?.id);

                if (profileError) {
                    console.error("Failed to update profile:", profileError);
                }
            }
            }
        saveRoom();
    }, [currentUser, room, roomStorageKey]);

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
