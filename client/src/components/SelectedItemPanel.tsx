import type { Dispatch, SetStateAction } from "react";
import type { Room } from "../room/room";

interface Props {
    room: Room;
    setRoom: Dispatch<SetStateAction<Room>>;
}

function SelectedItemPanel({ room, setRoom }: Props) {
    const selectedDecoration = room.decorations.find(
        (decoration) => decoration.id === room.selectedDecorationId
    );

    return (
        <>
            <h3 className="text-lg font-semibold text-white">
                Selected Item
            </h3>

            <div className="mt-3 rounded-xl bg-[#0B0B0F] border border-[#2A2E38] p-4">
                {selectedDecoration ? (
                    <p className="text-white capitalize">
                        {selectedDecoration.type}
                    </p>
                ) : (
                    <p className="text-slate-500">
                        Nothing selected
                    </p>
                )}

                {selectedDecoration && (
                    <button
                        onClick={(event) => {
                            event.stopPropagation();

                            setRoom({
                                ...room,
                                activePresetId: null,
                                decorations: room.decorations.filter(
                                    (decoration) =>
                                        decoration.id !== room.selectedDecorationId
                                ),
                                selectedDecorationId: null,
                            });
                        }}
                        className="
                            mt-4
                            bg-red-500
                            hover:bg-red-400
                            text-white
                            px-4
                            py-2
                            rounded-lg
                            transition-colors
                        "
                    >
                        Delete
                    </button>
                )}
            </div>
        </>
    );
}

export default SelectedItemPanel;