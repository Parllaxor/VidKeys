import { getUserById } from "../users/userDatabase";
import { getAvatarById } from "../users/avatars";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Footer from "../components/Footer";
import { User as UserIcon } from "lucide-react";
import { useState } from "react";

function FriendsPage() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<"friends" | "requests">(
        "friends"
    );

    const currentUserId = "test";
    const currentUser = getUserById(currentUserId);

    if (!currentUser) {
        return null;
    }

    const friends = currentUser.friends
        .map((friendId) => getUserById(friendId))
        .filter(
            (friend): friend is NonNullable<typeof friend> =>
                friend !== undefined
        );

    return (
        <AppLayout>
            <div className="mt-8">
                {/* Tabs */}
                <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setActiveTab("friends")}
                            className={`
                                rounded-2xl
                                px-4
                                py-2
                                text-xl
                                font-bold
                                transition-all
                                duration-200
                                ${
                                    activeTab === "friends"
                                        ? "bg-cyan-950/50 text-cyan-300"
                                        : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                                }
                            `}
                        >
                            Friends
                            <span className="ml-2 text-sm font-semibold text-slate-400">
                                {currentUser.friends.length}
                            </span>
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("requests")}
                            className={`
                                rounded-2xl
                                px-4
                                py-2
                                text-xl
                                font-bold
                                transition-all
                                duration-200
                                ${
                                    activeTab === "requests"
                                        ? "bg-cyan-950/50 text-cyan-300"
                                        : "text-slate-400 hover:bg-slate-900/60 hover:text-slate-200"
                                }
                            `}
                        >
                            Requests
                            <span className="ml-2 text-sm font-semibold text-slate-400">
                                {currentUser.receivedRequests.length}
                            </span>
                        </button>
                    </div>

                    <p className="mt-2 text-slate-400">
                        {activeTab === "friends"
                            ? "View and connect with your friends."
                            : "Manage your incoming friend requests."}
                    </p>
                </div>

                {/* Main Content */}
                <div className="mt-8">
                    {activeTab === "friends" ? (
                        <div>
                            {friends.length === 0 ? (
                                <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8 text-center">
                                    <p className="text-slate-400">
                                        You don't have any friends yet. Visit
                                        the users page to find new friends!
                                    </p>
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {friends.map((friend) => {
                                        const avatar = getAvatarById(
                                            friend.avatarId
                                        );

                                        return (
                                            <div
                                                key={friend.id}
                                                className="flex items-center justify-between rounded-2xl border border-slate-700 bg-[#111827] p-4 transition-all duration-200 hover:border-slate-600"
                                            >
                                                {/* Friend Info */}
                                                <div className="flex items-center gap-4">
                                                    <div className="relative">
                                                        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-600 bg-slate-900">
                                                            {avatar ? (
                                                                <img
                                                                    src={
                                                                        avatar.image
                                                                    }
                                                                    alt={`${friend.displayName}'s avatar`}
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <UserIcon className="h-7 w-7 text-slate-500" />
                                                            )}
                                                        </div>

                                                        {/* Status */}
                                                        <div
                                                            className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-[#111827] ${
                                                                friend.status ===
                                                                "online"
                                                                    ? "bg-cyan-400"
                                                                    : friend.status ===
                                                                      "away"
                                                                    ? "bg-yellow-400"
                                                                    : friend.status ===
                                                                      "dnd"
                                                                    ? "bg-red-400"
                                                                    : "bg-slate-500"
                                                            }`}
                                                        />
                                                    </div>

                                                    <div>
                                                        <h3 className="font-semibold text-white">
                                                            {
                                                                friend.displayName
                                                            }
                                                        </h3>

                                                        <p className="text-sm text-slate-400">
                                                            @{friend.username}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* View Profile */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        navigate(
                                                            `/profile/${friend.id}`
                                                        )
                                                    }
                                                    className="rounded-xl border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-300 transition-all duration-200 hover:border-cyan-400/50 hover:bg-cyan-950/40 hover:text-cyan-300"
                                                >
                                                    View Profile
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    ) : (
                        /* Requests */
                        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8 text-center">
                            <p className="text-slate-400">
                                Friend requests will appear here.
                            </p>
                        </div>
                    )}

                    {/* Find Friends */}
                    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/60 p-6 text-center">
                        <h2 className="text-lg font-semibold text-white">
                            Looking for more friends?
                        </h2>

                        <p className="mt-2 text-sm text-slate-400">
                            Find other VidKeys users and connect with new
                            people.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/users")}
                            className="mt-4 inline-flex items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-950/40 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-200"
                        >
                            Find Friends
                        </button>
                    </div>
                </div>
            </div>

            <Footer />
        </AppLayout>
    );
}

export default FriendsPage;