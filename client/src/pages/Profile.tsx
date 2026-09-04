import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    CalendarDays,
    ChevronDown,
    MessageCircle,
    Sparkles,
    User as UserIcon,
    Users,
    Wifi,
    Clock3,
    BellOff,
    MoonStar,
} from "lucide-react";
import AppLayout from "../layouts/AppLayout";
import Footer from "../components/Footer";
import ProfileEditor from "./ProfileEditor";
import { getCurrentUser, logout } from "../users/currentUser";
import { getAvatarById } from "../users/avatars";
import { getUserById, updateUser } from "../users/userDatabase";
import type { User } from "../users/user";

const statusOptions = [
    {
        value: "online",
        label: "Online",
        icon: Wifi,
        className: "border-cyan-400/40 bg-cyan-500/15 text-cyan-200",
    },
    {
        value: "away",
        label: "Busy",
        icon: Clock3,
        className: "border-amber-400/40 bg-amber-500/15 text-amber-200",
    },
    {
        value: "dnd",
        label: "Do Not Disturb",
        icon: BellOff,
        className: "border-rose-400/40 bg-rose-500/15 text-rose-200",
    },
    {
        value: "offline",
        label: "Appear Offline",
        icon: MoonStar,
        className: "border-slate-600 bg-slate-900/80 text-slate-200",
    },
] as const;

function Profile() {
    const navigate = useNavigate();
    const { userId } = useParams();
    const currentUser = getCurrentUser();
    const [user, setUser] = useState<User | undefined>(() => getUserById(userId ?? currentUser?.id ?? ""));
    const [editing, setEditing] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const statusRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!currentUser) {
            setUser(undefined);
            return;
        }

        setUser(getUserById(userId ?? currentUser.id));
    }, [userId, currentUser?.id]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (statusRef.current && !statusRef.current.contains(event.target as Node)) {
                setStatusOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!currentUser || !user) {
        return (
            <AppLayout>
                <div className="py-8 text-slate-300">ERROR: User not found</div>
            </AppLayout>
        );
    }

    const isOwnProfile = !userId || userId === currentUser.id;
    const avatar = getAvatarById(user.avatarId);
    const avatarImage = user.avatarUrl ?? avatar?.image;
    const currentStatus = statusOptions.find((option) => option.value === user.status) ?? statusOptions[0];
    const StatusIcon = currentStatus.icon;
    const joinedAt = new Date(user.createdAt).toLocaleDateString();
    const lastActive = new Date(user.lastActive).toLocaleString();
    const updatedAt = new Date(user.updatedAt).toLocaleDateString();

    const handleStatusChange = (status: User["status"]) => {
        const updatedUser = {
            ...user,
            status,
            updatedAt: Date.now(),
        };

        updateUser(updatedUser);
        setUser(updatedUser);
        setStatusOpen(false);
    };
    
    const handleLogout = () => {
        logout();
        navigate("/login");
    }

    if (editing) {
        return (
            <AppLayout>
                <ProfileEditor
                    user={user}
                    onClose={() => setEditing(false)}
                    onSave={(updatedUser) => {
                        updateUser(updatedUser);
                        setUser(updatedUser);
                    }}
                />
            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <section className="mx-auto max-w-7xl py-8">
                <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6 sm:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full bg-slate-800 ring-1 ring-slate-700">
                                {avatarImage ? (
                                    <img
                                        src={avatarImage}
                                        alt={avatar?.name ?? `${user.displayName}'s avatar`}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <UserIcon className="h-12 w-12 text-slate-400" />
                                )}
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-[0.24em] text-cyan-300">
                                    {isOwnProfile ? "Your profile" : "VidKeys profile"}
                                </p>
                                <h1 className="mt-3 text-4xl font-bold text-white">{user.displayName}</h1>
                                <p className="mt-2 text-slate-400">@{user.username}</p>
                                {user.bio && <p className="mt-4 max-w-2xl text-slate-300">{user.bio}</p>}
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            {isOwnProfile ? (
                                <>
                                    <div ref={statusRef} className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setStatusOpen((open) => !open)}
                                            className={`inline-flex min-w-[180px] items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold shadow-lg shadow-slate-950/30 transition hover:brightness-110 ${currentStatus.className}`}
                                        >
                                            <StatusIcon className="h-4 w-4" />
                                            <span className="flex-1 text-left">{currentStatus.label}</span>
                                            <ChevronDown className={`h-4 w-4 transition-transform ${statusOpen ? "rotate-180" : ""}`} />
                                        </button>

                                        {statusOpen && (
                                            <div className="absolute right-0 z-50 mt-2 w-56 rounded-2xl border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/40">
                                                {statusOptions.map((option) => {
                                                    const Icon = option.icon;

                                                    return (
                                                        <button
                                                            key={option.value}
                                                            type="button"
                                                            onClick={() => handleStatusChange(option.value)}
                                                            className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                                                                option.value === user.status
                                                                    ? "bg-slate-800 text-white"
                                                                    : "text-slate-400 hover:bg-slate-800/70 hover:text-white"
                                                            }`}
                                                        >
                                                            <Icon className="h-4 w-4" />
                                                            <span>{option.label}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setEditing(true)}
                                        className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300"
                                    >
                                        Edit Profile
                                    </button>
                                </>
                            ) : (
                                <div className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm font-medium text-slate-300">
                                    <StatusIcon className="h-4 w-4 text-cyan-300" />
                                    {user.status === "offline" ? "Offline" : currentStatus.label}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
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
                                <StatCard label="Room visits" value={user.roomsVisited} />
                                <StatCard label="Total call minutes" value={user.totalCallMinutes} />
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

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <DetailCard label="Member since" value={joinedAt} />
                                <DetailCard label="Last active" value={lastActive} />
                                {isOwnProfile && <DetailCard label="Friends" value={user.friends.length.toString()} />}
                                {isOwnProfile && <DetailCard label="Room" value={user.roomId ?? "No Room Yet"} />}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-6">
                        <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Connections</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-white">
                                        {isOwnProfile ? "Friend network" : `Connect with ${user.displayName}`}
                                    </h2>
                                </div>
                                <Users className="h-6 w-6 text-cyan-400" />
                            </div>

                            {isOwnProfile ? (
                                <div className="mt-6 space-y-4">
                                    {user.friends.length > 0 ? (
                                        user.friends.map((friendId) => {
                                            const friend = getUserById(friendId);

                                            return (
                                                <div key={friendId} className="rounded-2xl bg-slate-900/80 p-4">
                                                    <p className="font-semibold text-white">{friend?.displayName ?? friendId}</p>
                                                    <p className="mt-1 text-sm text-slate-500">{friend ? `@${friend.username}` : "Friend profile unavailable"}</p>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="rounded-2xl bg-slate-900/80 p-4 text-slate-400">
                                            No friends added yet. Invite a friend to start chatting!
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-6 grid gap-3">
                                    <button className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300">
                                        Invite to Room
                                    </button>
                                </div>
                            )}
                        </div>

                        {isOwnProfile && (
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
                                        type="button"
                                        onClick={() => setEditing(true)}
                                        className="rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300"
                                    >
                                        Customize profile
                                    </button>
                                          
                                    <button
                                        type="button"
                                        onClick={handleLogout}
                                        className="rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-300 transition hover:bg-rose-500/20"
                                    >
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <Footer />
        </AppLayout>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-2xl bg-slate-900/80 p-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
        </div>
    );
}

function DetailCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="rounded-2xl bg-slate-900/80 p-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-white">{value}</p>
        </div>
    );
}

export default Profile;
