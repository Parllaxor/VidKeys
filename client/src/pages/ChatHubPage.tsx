import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import { getCurrentUser } from "../users/currentUser";
import { getUserById } from "../users/userDatabase";
import { getAvatarById } from "../users/avatars";

function ChatHubPage() {
    const { friendId } = useParams<{ friendId: string }>();
    const navigate = useNavigate();

    const currentUser = getCurrentUser();

    const [search, setSearch] = useState("");

    if (!currentUser) {
        return null;
    }

    const friends = currentUser.friends
        .map((id) => getUserById(id))
        .filter((friend) => friend !== undefined);

    const filteredFriends = friends.filter((friend) =>
        friend.displayName
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    return (
        <AppLayout>
            <div className="mt-8 flex h-[calc(100vh-10rem)] min-h-[500px] flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/60">

                {/* Search Bar */}
                <div className="border-b border-slate-700 bg-[#111827] p-4">
                    <input
                        type="text"
                        value={search}
                        onChange={(event) =>
                            setSearch(event.target.value)
                        }
                        placeholder="Search friends..."
                        className="
                            w-full
                            rounded-xl
                            border
                            border-slate-700
                            bg-slate-900
                            px-4
                            py-3
                            text-sm
                            text-white
                            outline-none
                            placeholder:text-slate-500
                            focus:border-cyan-400
                        "
                    />
                </div>

                {/* Main Chat Area */}
                <div className="flex min-h-0 flex-1">

                    {/* Friend List */}
                    <div className="w-48 shrink-0 border-r border-slate-700 bg-[#111827]">

                        <div className="border-b border-slate-700 px-4 py-3">
                            <h1 className="text-sm font-bold text-white">
                                Friends
                            </h1>
                        </div>

                        <div className="p-2">
                            {filteredFriends.length === 0 ? (
                                <p className="px-3 py-5 text-center text-xs text-slate-500">
                                    No friends found.
                                </p>
                            ) : (
                                filteredFriends.map((friend) => {
                                    const avatar = getAvatarById(friend.avatarId);

                                    const avatarImage =
                                        friend.avatarUrl ?? avatar?.image;

                                    return (
                                        <button
                                            key={friend.id}
                                            type="button"
                                            onClick={() =>
                                                navigate(`/chat/${friend.id}`)
                                            }
                                            className={`
                                                flex
                                                w-full
                                                items-center
                                                gap-2
                                                rounded-lg
                                                px-2
                                                py-2
                                                text-left
                                                transition-colors
                                                duration-200
                                                ${
                                                    friend.id === friendId
                                                        ? "bg-slate-800"
                                                        : "hover:bg-slate-800/70"
                                                }
                                            `}
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-700">
                                                {avatarImage ? (
                                                    <img
                                                        src={avatarImage}
                                                        alt={avatar?.name ?? "Avatar"}
                                                        className="h-8 w-8 object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-xs font-semibold text-cyan-400">
                                                        {friend.displayName
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </span>
                                                )}
                                            </div>

                                            <p className="truncate text-sm font-medium text-white">
                                                {friend.displayName}
                                            </p>
                                        </button>
                                    );
                                })
                            )}
                        </div>
                    </div>

                    {/* Current Chat */}
                    <div className="flex min-w-0 flex-1 items-center justify-center">
                        {friendId ? (
                            <p className="text-slate-400">
                                Chat with {friendId}
                            </p>
                        ) : (
                            <p className="text-slate-500">
                                Select a friend to start chatting.
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </AppLayout>
    );
}

export default ChatHubPage;