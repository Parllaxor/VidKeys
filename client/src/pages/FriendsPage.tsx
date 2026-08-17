import { getUserById, removeFriend, removeFriendRequests, addFriend } from "../users/userDatabase";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Footer from "../components/Footer";
import FriendCard from "../components/FriendCard";
import FriendRequests from "../components/FriendRequests";
import ConfirmationModal from "../components/ConfirmationModal";
import { useState } from "react";

function FriendsPage() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<"friends" | "requests">(
        "friends"
    );

    const [user, setUser] = useState(() => getUserById("test"));
    const [friendToRemove, setFriendToRemove] = useState<string | null>(null);

    const currentUser = user;

    if (!currentUser) {
        return null;
    }

    const friends = currentUser.friends
        .map((friendId) => getUserById(friendId))
        .filter(
            (friend): friend is NonNullable<typeof friend> =>
                friend !== undefined
        );

    const handleRemoveFriend = (friendId: string) => {
        const friend = getUserById(friendId);

        if (!friend) {
            return;
        }

        removeFriend(currentUser, friend);

        setUser({
            ...currentUser,
            friends: currentUser.friends.filter(
                (id) => id !== friendId
            ),
        });
    };

    const handleAcceptRequest = (requestId: string) => {
        const request = getUserById(requestId);

        if (!request) {
            return;
        }

        addFriend(currentUser, request);

        const updatedUser = getUserById(currentUser.id);

        if (updatedUser) {
            setUser(updatedUser);
        }
    };

    const handleDeclineRequest = (requestId: string) => {
        const request = getUserById(requestId); 
        
        if (!request) {
            return;
        }

        removeFriendRequests(currentUser, request);

        const updatedUser = getUserById(currentUser.id);

        if (updatedUser) {
            setUser(updatedUser);
        }
    };

    return (
        <AppLayout>
            <div className="mt-8">
                {/* Tabs */}
                <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                    <div className="flex items-center gap-2 border-b border-slate-800">
                        <button
                            type="button"
                            onClick={() => setActiveTab("friends")}
                            className={`
                                relative
                                rounded-t-xl
                                px-4
                                py-2
                                text-lg
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

                            {activeTab === "friends" && (
                                <span className="
                                    absolute
                                    bottom-0
                                    left-2
                                    right-2
                                    h-0.5
                                    rounded-full
                                    bg-cyan-400    
                                " />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => setActiveTab("requests")}
                            className={`
                                relative
                                rounded-t-xl
                                px-4
                                py-2
                                text-lg
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

                            {activeTab === "requests" && (
                                <span className="
                                    absolute
                                    bottom-0
                                    left-2
                                    right-2
                                    h-0.5
                                    rounded-full
                                    bg-cyan-400
                                " />
                            )}
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
                                    {friends.map((friend) => (
                                        <FriendCard 
                                            key={friend.id}
                                            friend={friend}
                                            onRemove={setFriendToRemove}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        // Requests Cards
                        <FriendRequests
                            requests={currentUser.receivedRequests}
                            onAccept={handleAcceptRequest}
                            onDecline={handleDeclineRequest}
                            onViewProfile={(id) => navigate(`/profile/${id}`)}
                        />
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

            <ConfirmationModal
                isOpen={friendToRemove !== null}
                title="Remove Friend?"
                message={
                    friendToRemove
                        ? `Are you sure you want to remove ${
                            getUserById(friendToRemove)?.displayName ?? "this friend"
                        } from your friends?`
                        : ""
                }
                confirmText="Remove Friend"
                onConfirm={() => {
                    if (friendToRemove) {
                        handleRemoveFriend(friendToRemove);
                    }

                    setFriendToRemove(null);
                }}
                onCancel={() => setFriendToRemove(null)}
            />

            <Footer />
        </AppLayout>
    );
}

export default FriendsPage;