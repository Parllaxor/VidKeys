import { getUserById } from "../users/userDatabase";
import { getAvatarById } from "../users/avatars";
import { User, CalendarDays, MessageCircle, Users, Sparkles } from "lucide-react";
import { useState } from "react";
import ProfileEditor from "./ProfileEditor";

function Profile() {

    const user = getUserById("test");

    if (!user) {
        return <div>ERROR: User not found</div>;
    }

    const avatar = getAvatarById(user.avatarId);
    const lastActive = new Date(user.lastActive).toLocaleString();
    const joinedAt = new Date(user.createdAt).toLocaleDateString();
    const updatedAt = new Date(user.updatedAt).toLocaleDateString();

    const [editing, setEditing] = useState(false);

    if (editing) {
        return (
            <ProfileEditor 
                user={user}
                onClose={() => setEditing(false)}
            />
        )
    }

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="space-y-6">
                <div className="rounded-3xl border border-slate-700 bg-slate-950/50 p-6 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex items-center gap-5">
                            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-800 ring-1 ring-slate-700">
                                {avatar ? (
                                    <img
                                        src={avatar.image}
                                        alt={avatar.name}
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

                        <div className="flex flex-wrap gap-3">
                            <span className={`
                                inline-flex
                                items-center 
                                gap-2 
                                rounded-full 
                                px-4 py-2 
                                text-sm 
                                font-medium
                                border
                                ${
                                    user.status === "online" 
                                        ? "bg-cyan-400 text-black border-cyan-400"
                                        : "bg-transparent text-slate-400 border-slate-600"
                                    }
                                `}>
                                <Sparkles className="w-4 h-4" />
                                {user.status.toUpperCase()}
                            </span>
                            <button 
                                onClick={() => setEditing(true)}
                                className="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-black transition-colors hover:bg-cyan-300">
                                Edit Profile
                            </button>
                        </div>
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
                                    <p className="mt-1 text-sm text-slate-400">You have visited {user.roomsVisited} rooms!</p>
                                </div>
                                <div className="rounded-2xl bg-slate-900/80 p-4">
                                    <p className="text-sm text-slate-500">Total call minutes</p>
                                    <p className="mt-2 text-3xl font-semibold text-white">{user.totalCallMinutes}</p>
                                    <p className="mt-1 text-sm text-slate-400">You have spent {user.totalCallMinutes} minutes calling!</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm uppercase tracking-[0.24em] text-slate-500">About</p>
                                    <h2 className="mt-3 text-2xl font-semibold text-white">Personal details</h2>
                                </div>
                                <MessageCircle className="h-6 w-6 text-cyan-400" />
                            </div>

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
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Profile;