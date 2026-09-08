import { removeFriend, removeFriendRequests, addFriend } from "../users/userDatabase";
import { getCurrentUser } from "../users/currentUser";
import type { User } from "../users/user";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Footer from "../components/Footer";
import FriendCard from "../components/FriendCard";
import FriendRequests from "../components/FriendRequests";
import ConfirmationModal from "../components/ConfirmationModal";
import { useState, useEffect } from "react";
import { supabase } from "../services/supabase";

function FriendsPage() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState<"friends" | "requests">(
        "friends"
    );
    
    const currentUser = getCurrentUser();
    
    const [friendToRemove, setFriendToRemove] = useState<string | null>(null);
    const [friends, setFriends] = useState<User[]>([]);
    const [requests, setRequests] = useState<User[]>([]);

    useEffect(() => {
        async function loadFriends() {
            const { data: friendships, error: friendshipError } = await supabase
                .from("friendships")
                .select("friend_id")
                .eq("user_id", currentUser?.id);

            if (friendshipError) {
                console.error("Failed to load friendships:", friendshipError);
                return;
            }

            const ids = friendships.map((friendship) => friendship.friend_id);

            const { data: friendProfiles, error: friendProfilesError } = await supabase
                .from("profiles")
                .select("*")
                .in("id", ids);

            if (friendProfilesError) {
                console.error("Failed to load friends:", friendProfilesError);
                return;
            }

            setFriends(
                friendProfiles.map((profile) => ({
                    id: profile.id,
                    username: profile.username,
                    displayName: profile.display_name,
                    bio: profile.bio,
                    birthday: profile.birthday,
                    avatarId: profile.avatar_id,
                    avatarUrl: profile.avatar_url,
                    uploadedAvatars: [],
                    status: profile.status,
                    createdAt: new Date(profile.created_at).getTime(),
                    updatedAt: new Date(profile.updated_at).getTime(),
                    lastActive: new Date(profile.last_active).getTime(),
                    friends: [],
                    sentRequests: [],
                    receivedRequests: [],
                    blockedUsers: [],
                    reports: [],
                    roomId: null,
                    roomsCreated: profile.rooms_created,
                    roomsVisited: profile.rooms_visited,
                    totalCallMinutes: profile.total_call_minutes,
                    gamesPlayed: profile.games_played,
                    achievementsUnlocked: profile.achievements_unlocked,
                    favoriteTheme: profile.favorite_theme,
                    reputation: profile.reputation,
                }))
            );

            const { data: receivedRequests, error: requestError } = await supabase
                .from("friend_requests")
                .select("sender_id")
                .eq("receiver_id", currentUser?.id);

            if (requestError) {
                console.error("Failed to load friend requests:", requestError);
                return;
            }

            const requestIds = receivedRequests.map((request) => request.sender_id);

            const { data: requestProfiles, error: requestProfilesError } = await supabase
                .from("profiles")
                .select("*")
                .in("id", requestIds);

            if (requestProfilesError) {
                console.error("Failed to load request profiles:", requestProfilesError);
                return;
            }

            setRequests(
                requestProfiles.map((profile) => ({
                    id: profile.id,
                    username: profile.username,
                    displayName: profile.display_name,
                    bio: profile.bio,
                    birthday: profile.birthday,
                    avatarId: profile.avatar_id,
                    avatarUrl: profile.avatar_url,
                    uploadedAvatars: [],
                    status: profile.status,
                    createdAt: new Date(profile.created_at).getTime(),
                    updatedAt: new Date(profile.updated_at).getTime(),
                    lastActive: new Date(profile.last_active).getTime(),
                    friends: [],
                    sentRequests: [],
                    receivedRequests: [],
                    blockedUsers: [],
                    reports: [],
                    roomId: null,
                    roomsCreated: profile.rooms_created,
                    roomsVisited: profile.rooms_visited,
                    totalCallMinutes: profile.total_call_minutes,
                    gamesPlayed: profile.games_played,
                    achievementsUnlocked: profile.achievements_unlocked,
                    favoriteTheme: profile.favorite_theme,
                    reputation: profile.reputation,
                }))
            );
        }

        loadFriends();
    }, [currentUser?.id]);

    if (!currentUser) {
        return null;
    }

    const handleRemoveFriend = async (friendId: string) => {
        const friend = friends.find((user) => user.id === friendId);

        if (!friend) {
            return;
        }

        await removeFriend(currentUser, friend);
        window.location.reload();
    };

    const handleAcceptRequest = async (requestId: string) => {
        const request = requests.find((user) => user.id === requestId);

        if (!request) {
            return;
        }

        await addFriend(currentUser, request);
        window.location.reload();
    };

    const handleDeclineRequest = async (requestId: string) => {
        const request = requests.find((user) => user.id === requestId);

        if (!request) {
            return;
        }

        await removeFriendRequests(currentUser, request);
        window.location.reload();
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
                                {friends.length}
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
                                {requests.length}
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
                            requests={requests}
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
                            friends.find((friend) => friend.id === friendToRemove)?.displayName ?? "this friend"
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
