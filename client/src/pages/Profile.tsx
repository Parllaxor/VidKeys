import { getUserById } from "../users/userDatabase";
import { getAvatarById } from "../users/avatars";
import { User, CalendarDays, MessageCircle, Users, Sparkles, ChevronDown, Wifi, Clock3, BellOff, MoonStar, ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../users/userDatabase";
import ProfileEditor from "./ProfileEditor";

function Profile() {

    const { userId } = useParams();
    const currentUserId = "test";
    const navigate = useNavigate();
    const [user, setUser] = useState(() => getUserById(userId ?? "test"));
    const isOwnProfile = !userId || userId === currentUserId;

    if (!user) {
        return <div>ERROR: User not found</div>;
    }

    const avatar = getAvatarById(user.avatarId);
    const avatarImage = user.avatarUrl ?? avatar?.image;
    const lastActive = new Date(user.lastActive).toLocaleString();
    const joinedAt = new Date(user.createdAt).toLocaleDateString();
    const updatedAt = new Date(user.updatedAt).toLocaleDateString();
    const statusOptions = [
        { value: "online", label: "Online", icon: Wifi, className: "border-cyan-400/40 bg-cyan-500/15 text-cyan-200" },
        { value: "away", label: "Busy", icon: Clock3, className: "border-amber-400/40 bg-amber-500/15 text-amber-200" },
        { value: "dnd", label: "Do Not Disturb", icon: BellOff, className: "border-rose-400/40 bg-rose-500/15 text-rose-200" },
        { value: "offline", label: "Appear Offline", icon: MoonStar, className: "border-slate-600 bg-slate-900/80 text-slate-200" },
    ] as const;
    const currentStatus = statusOptions.find((option) => option.value === user.status) ?? statusOptions[0];
    const canViewPrivateDetails = isOwnProfile;

    const [editing, setEditing] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const statusRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                statusRef.current &&
                !statusRef.current.contains(event.target as Node)
            ) {
                setStatusOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    if (editing) {
        return (
            <ProfileEditor 
                user={user}
                onClose={() => setEditing(false)}
                onSave={(updatedUser) => {
                    updateUser(updatedUser);
                    setUser(updatedUser);
                }}
            />
        )
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mb-6 flex items-center">
                {isOwnProfile && (
                    <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Dashboard
                    </button>
                )}
                {!isOwnProfile && (
                    <button
                        type="button"
                        onClick={() => navigate("/users")}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-4 py-2 text-sm font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                    </button>
                )}
            </div>

            <div className="space-y-6">
                <div className="rounded-3xl border border-slate-700 bg-slate-950/50 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-5">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 ring-1 ring-slate-700">
                                {avatarImage ? (
                                    <img
                                        src={avatarImage}
                                        alt={avatar?.name ?? "Profile avatar"}
                                        className="h-24 w-24 rounded-full object-cover"
                                        />
                                ) : (
                                    <User className="h-12 w-12 text-slate-400" />
                                )}
                            </div>

                            <div>
                                <h1 className="text-3xl font-bold text-white">{user.displayName}</h1>
                                <p className="mt-1 text-slate-400">@{user.username}</p>
                                <p className="mt-3 max-w-xl text-slate-300">{user.bio}</p>
                            </div>
                        </div>
                        {isOwnProfile ? (
                            <div className="flex flex-wrap gap-3">
                                <div ref={statusRef} className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setStatusOpen(!statusOpen)}
                                        className={`
                                            flex
                                            min-w-[180px]
                                            items-center
                                            gap-2
                                            rounded-full
                                            border
                                            px-4
                                            py-2.5
                                            text-sm
                                            font-semibold
                                            shadow-lg
                                            shadow-slate-950/30
                                            outline-none
                                            transition-all
                                            duration-200
                                            hover:brightness-110
                                            ${currentStatus.className}
                                        `}
                                    >
                                        <currentStatus.icon className="h-4 w-4" />

                                        <span className="flex-1 text-left">
                                            {currentStatus.label}
                                        </span>

                                        <ChevronDown
                                            className={`
                                                h-4
                                                w-4
                                                transition-transform
                                                duration-200
                                                ${statusOpen ? "rotate-180" : ""}
                                            `}
                                        />
                                    </button>
                                    {statusOpen && (
                                        <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/40">
                                            {statusOptions.map((option) => {
                                                const Icon = option.icon;

                                                return (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            updateUser({
                                                                ...user,
                                                                status: option.value,
                                                                updatedAt: Date.now(),
                                                            });

                                                            setUser({
                                                                ...user,
                                                                status: option.value,
                                                                updatedAt: Date.now(),
                                                            });

                                                            setStatusOpen(false);
                                                        }}
                                                        className={`
                                                            flex
                                                            w-full
                                                            items-center
                                                            gap-3
                                                            rounded-xl
                                                            px-3
                                                            py-2.5
                                                            text-left
                                                            text-sm
                                                            transition
                                                            ${
                                                                option.value === user.status
                                                                    ? "bg-slate-800 text-white"
                                                                    : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                                                            }
                                                        `}
                                                    >
                                                        <Icon className="h-4 w-4" />

                                                        <span>
                                                            {option.label}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                <button 
                                    onClick={() => setEditing(true)}
                                    className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm font-medium text-slate-300">
                                <currentStatus.icon className="h-4 w-4 text-cyan-300" />
                                {!isOwnProfile && user.status === "offline"
                                    ? "Offline"
                                    : currentStatus.label
                                }
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
                    <div className="grid gap-6">
                        <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Activity Overview</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-white">Recent profile activity</h2>
                                </div>
                                <div className="inline-flex items-center rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-300">
                                    <CalendarDays className="mr-2 h-4 w-4" />
                                    Last updated {updatedAt}
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 md:grid-cols-2">
                                <div className="rounded-2xl bg-slate-900/80 p-4">
                                    <p className="text-sm text-slate-500">Room visits</p>
                                    <p className="mt-2 text-3xl font-semibold text-white">{user.roomsVisited}</p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        {isOwnProfile
                                            ? `You have visited ${user.roomsVisited} rooms!`
                                            : `${user.displayName} has visited ${user.roomsVisited} rooms!`
                                        }
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-slate-900/80 p-4">
                                    <p className="text-sm text-slate-500">Total call minutes</p>
                                    <p className="mt-2 text-3xl font-semibold text-white">{user.totalCallMinutes}</p>
                                    <p className="mt-1 text-sm text-slate-400">
                                        {isOwnProfile
                                            ? `You have spent ${user.totalCallMinutes} minutes calling!`
                                            : `${user.displayName} has spent ${user.totalCallMinutes} minutes calling!`
                                        }
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">About</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-white">
                                        {isOwnProfile ? "Personal details" : "Profile details"}
                                    </h2>
                                </div>
                                <MessageCircle className="h-6 w-6 text-cyan-400" />
                            </div>

                            {canViewPrivateDetails ? (
                                <>
                                    <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                        <div className="rounded-2xl bg-slate-900/80 p-4">
                                            <p className="text-sm text-slate-500">Friends</p>
                                            <p className="mt-2 text-xl font-semibold text-white">{user.friends.length}</p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-900/80 p-4">
                                            <p className="text-sm text-slate-500">Room</p>
                                            <p className="mt-2 text-xl font-semibold text-white">{user.roomId ?? "No Room Yet"}</p>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="mt-6 rounded-2xl border border-slate-700 bg-slate-900/80 p-4 text-sm text-slate-300">
                                    This user keeps some details private.
                                </div>
                            )}

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-2xl bg-slate-900/80 p-4">
                                    <p className="text-sm text-slate-500">Member since</p>
                                    <p className="mt-2 text-white">{joinedAt}</p>
                                </div>
                                <div className="rounded-2xl bg-slate-900/80 p-4">
                                    <p className="text-sm text-slate-500">Last active</p>
                                    <p className="mt-2 text-white">{lastActive}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        {canViewPrivateDetails ? (
                            <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Connections</p>
                                        <h2 className="mt-3 text-2xl font-semibold text-white">Friend network</h2>
                                    </div>
                                    <Users className="h-6 w-6 text-cyan-400" />
                                </div>

                                <div className="mt-6 space-y-4">
                                    {user.friends.length > 0 ? (
                                        user.friends.map((friendId) => (
                                            <div key={friendId} className="rounded-2xl bg-slate-900/80 p-4">
                                                <p className="font-semibold text-white">{friendId}</p>
                                                <p className="mt-1 text-sm text-slate-500">Active in the last 3 days</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="rounded-2xl bg-slate-900/80 p-4 text-slate-400">
                                            No friends added yet. Invite a friend to start chatting!
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Social</p>
                                        <h2 className="mt-3 text-2xl font-semibold text-white">Connect with {user.displayName}</h2>
                                    </div>
                                    <Users className="h-6 w-6 text-cyan-400" />
                                </div>

                                <div className="mt-6 grid gap-3">
                                    <button className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300">
                                        Invite to Room
                                    </button>
                                    <button className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
                                        Add Friend
                                    </button>
                                </div>
                            </div>
                        )}

                        {canViewPrivateDetails && (
                            <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Quick actions</p>
                                        <h2 className="mt-3 text-2xl font-semibold text-white">Keep the profile fresh</h2>
                                    </div>
                                    <Sparkles className="h-6 w-6 text-cyan-400" />
                                </div>

                                <div className="mt-6 grid gap-3">
                                    <button 
                                        onClick={() => setEditing(true)}
                                        className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300">
                                        Customize profile
                                    </button>
                                    <button className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
                                        Manage notifications
                                    </button>
                                    <button className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
                                        Privacy settings
                                    </button>
                                    <button className="rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">
                                        Profile settings
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;