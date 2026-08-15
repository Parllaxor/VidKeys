import { getUserById, getAllUsers, sendFriendRequest, removeFriend, blockUser, addFriend, removeFriendRequests, userExists } from "../users/userDatabase";
import type { User } from "../users/user";
import { getAvatarById } from "../users/avatars";
import { UserRound, UserPlus } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AppLayout from "../layouts/AppLayout";
import ConfirmationModal from "../components/ConfirmationModal";
import Footer from "../components/Footer";

function UsersPage() {
    const statusLabels = {
        online: "Online",
        offline: "Offline",
        away: "Away",
        dnd: "Do Not Disturb",
    };

    const users = getAllUsers();
    const currentUserId = "test";
    const currentUser = getUserById(currentUserId);

    const sortedUsers = [...users].sort((a, b) => {
        if (a.id === currentUserId) return -1;
        if (b.id === currentUserId) return 1;
        return 0;
    });

    const navigate = useNavigate();
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [friendToRemove, setFriendToRemove] = useState<User | null>(null);

    return (
        <AppLayout>
            <div className="mt-8 gap-4">
                <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                    <h1 className="text-3xl font-bold text-white">
                        Users
                    </h1>

                    <p className="mt-2 text-slate-400">
                        Find and connect with other VidKeys users.
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-4">
                {sortedUsers.map((user) => {

                    const isCurrentUser = user.id === currentUserId;

                    const isFriend = currentUser?.friends.includes(user.id);
                    const requestSent = currentUser?.sentRequests.includes(user.id);
                    const requestReceived = currentUser?.receivedRequests.includes(user.id);
                    const isBlocked = currentUser?.blockedUsers.includes(user.id);

                    return (
                        <div
                        key={user.id}
                        className={`
                            group
                            relative
                            overflow-hidden
                            flex
                            flex-col
                            gap-4
                            rounded-2xl
                            border
                            p-4
                            transition-all
                            duration-300
                            hover:-translate-y-1
                            hover:shadow-lg
                            sm:p-5
                            md:flex-row
                            md:items-center
                            md:justify-between
                            md:gap-5
                            md:p-6
                            ${
                                isCurrentUser
                                    ? "bg-cyan-950/40 border-cyan-400/40 hover:border-cyan-400/70"
                                    : "bg-[#111827] border-[#2A2E38] hover:border-cyan-400/50"
                            }
                        `}
                    >
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center md:flex-row md:items-center">
                            <div className="
                                h-16
                                w-16
                                flex-shrink-0
                                overflow-hidden
                                rounded-full
                                bg-slate-700
                                flex
                                items-center
                                justify-center
                                sm:h-20
                                sm:w-20
                            ">
                                {user.avatarUrl ? (
                                    <img
                                        src={user.avatarUrl}
                                        alt={`${user.displayName}'s avatar`}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    (() => {
                                        const avatar = getAvatarById(user.avatarId);
                                        
                                        return avatar ? (
                                            <img
                                                src={avatar.image}
                                                alt={avatar.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="text-slate-400">
                                                No Avatar
                                            </div>
                                        );
                                    })()
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <h2 className="text-lg font-semibold text-white sm:text-xl">
                                    {user.displayName}
                                </h2>

                                <p className="mt-1 text-sm text-slate-400">
                                    @{user.username}
                                </p>

                                <p className="mt-2 text-sm text-slate-300 sm:text-base">
                                    {user.bio.length > 30
                                        ? user.bio.slice(0, 27) + "..."
                                        : user.bio
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col items-end gap-3 sm:gap-4 md:self-start">
                            <div className="flex items-center gap-2">
                                <div
                                    className={`h-3 w-3 rounded-full transition-all duration-200
                                        hover:scale-125
                                        ${user.status === "online"
                                            ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)] hover:shadow-[0_0_14px_rgba(52,211,153,1)]"
                                            : user.status === "offline"
                                            ? "bg-slate-500 shadow-[0_0_6px_rgba(100,116,139,0.5)] hover:shadow-[0_0_12px_rgba(100,116,139,0.8)]"
                                            : user.status === "dnd"
                                            ? "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.7)] hover:shadow-[0_0_14px_rgba(248,113,113,1)]"
                                            : user.status === "away"
                                            ? "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.7)] hover:shadow-[0_0_14px_rgba(251,191,36,1)]"
                                            : "bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                                        }`}
                                />

                                <span className="text-sm font-medium text-white md:text-base">
                                    {statusLabels[user.status]}
                                </span>
                            </div>

                            {!isCurrentUser && (
                                <div
                                    className="
                                        flex
                                        flex-col
                                        gap-2
                                        sm:flex-row

                                        md:translate-x-8
                                        md:opacity-0
                                        md:pointer-events-none
                                        md:transition-all
                                        md:duration-300
                                        md:group-hover:translate-x-0
                                        md:group-hover:opacity-100
                                        md:group-hover:pointer-events-auto

                                        md:rounded-full
                                        md:border
                                        md:border-cyan-400/40
                                        md:bg-slate-900/90
                                        md:px-4
                                        md:py-2
                                        md:text-sm
                                        md:font-semibold
                                        md:text-cyan-300

                                        md:hover:bg-slate-700
                                        md:hover:text-black
                                    "
                                >
                                    <button
                                        type="button"
                                        onClick={() => navigate(`/profile/${user.id}`)}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 sm:px-4 sm:py-3 sm:text-sm md:px-4 md:py-3"
                                    >
                                        <UserRound className="h-4 w-4" />
                                        View Profile
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => {
                                            const fromUser = getUserById("test");
                                            const toUser = user;

                                            if (!fromUser || !toUser) {
                                                return;
                                            }

                                            if (isFriend) {
                                                setFriendToRemove(toUser);
                                                setShowConfirmation(true);
                                            } else if (requestSent) {
                                                removeFriendRequests(fromUser, toUser);
                                            } else if (requestReceived) {
                                                addFriend(fromUser, toUser);
                                            } else {
                                                sendFriendRequest(fromUser, toUser);
                                            }
                                            
                                        }}
                                        className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300 sm:px-4 sm:py-3 sm:text-sm md:px-4 md:py-3"
                                    >
                                        {isFriend ? (
                                            <>
                                                <UserRound className="h-4 w-4" />
                                                Remove Friend
                                            </>
                                        ) : requestSent ? (
                                            <>
                                                <UserPlus className="h-4 w-4" />
                                                Cancel Request
                                            </>
                                        ) : requestReceived ? (
                                            <>
                                                <UserPlus className="h-4 w-4" />
                                                Accept Request
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus className="h-4 w-4" />
                                                Add Friend
                                            </>
                                        )}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                );  
                })}
            </div>

            <ConfirmationModal 
                isOpen={showConfirmation}
                title="Remove Friend?"
                message={
                    friendToRemove
                        ? `Are you sure you want to remove ${friendToRemove.displayName} from your friends?`
                        : "Are you sure you want to remove this user from your friends?"
                }
                confirmText="Remove Friend"
                onConfirm={() => {
                    if (!currentUser || !friendToRemove) {
                        return;
                    }

                    removeFriend(currentUser, friendToRemove);
                    setShowConfirmation(false);
                    setFriendToRemove(null);
                }}  
                onCancel={() => {
                    setShowConfirmation(false);
                    setFriendToRemove(null);
                }}  
            />

            <Footer />
        </AppLayout>
    );
}

export default UsersPage;