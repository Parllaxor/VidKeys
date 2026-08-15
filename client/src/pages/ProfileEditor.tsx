import type { User } from "../users/user";
import { User as UserIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAvatarById } from "../users/avatars";

interface Props {
    user: User;
    onClose: () => void;
    onSave: (updatedUser: User) => void;
}

function ProfileEditor({ user, onClose, onSave }: Props) {

    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState(user.displayName);
    const [displayBio, setBio] = useState(user.bio);

    const avatar = getAvatarById(user.avatarId);
    const avatarImage = user.avatarUrl ?? avatar?.image;

    const handleSave = () => {
        const updatedUser: User = {
            ...user,
            displayName,
            bio: displayBio,
            updatedAt: Date.now(),
        };

        onSave(updatedUser);
        onClose();
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="mt-2 rounded-3xl border border-slate-700 bg-slate-950/60 p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-slate-800 ring-1 ring-slate-700">
                        {avatarImage ? (
                            <img
                                src={avatarImage}
                                alt={avatar?.name ?? "Profile avatar"}
                                className="h-24 w-24 rounded-full object-cover"
                            />
                        ) : (
                            <UserIcon className="h-12 w-12 text-slate-400" />
                        )}
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-white">Edit Profile</h2>
                        <p className="mt-2 text-md text-slate-400">
                            Update your profile information.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-4 rounded-3xl border border-slate-700 bg-slate-950/60 p-8">
                {/* Display Name */}
                <div className="mb-4">
                    <label
                        htmlFor="displayName"
                        className="block text-sm font-medium text-slate-300"
                    >
                        Display Name
                    </label>
                    <input
                        type="text"
                        id="displayName"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white transition hover:border-cyan-400 hover:outline-none focus:border-cyan-400 focus:outline-none placeholder:text-slate-500 duration-300"
                        placeholder={user.displayName}
                    />
                </div>

                {/* Username */}
                <div className="mb-4">
                    <label
                        htmlFor="username"
                        className="block text-sm font-medium text-slate-300"
                    >
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        value={user.username}
                        disabled
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white transition focus:border-cyan-400 focus:outline-none placeholder:text-slate-500 duration-300"
                        placeholder={user.username}
                    />
                </div>
            </div>

            <div className="mt-4 rounded-3xl border border-slate-700 bg-slate-950/60 p-8">
                <div className="mb-4">
                    <label
                        htmlFor="bio"
                        className="block text-md font-medium text-slate-300"
                    >
                        Bio
                    </label>
                    <textarea
                        id="bio"
                        rows={5}
                        value={displayBio}
                        onChange={(e) => setBio(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white transition hover:border-cyan-400 hover:outline-none focus:border-cyan-400 focus:outline-none placeholder:text-slate-500 duration-300"
                        placeholder={user.bio}
                    />
                </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <button
                    onClick={() => navigate("/profile/avatar")}
                    className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
                >
                    Choose avatar
                </button>

                <div className="flex flex-wrap justify-end gap-4">
                    <button
                        onClick={handleSave}
                        className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={onClose}
                        className="rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </section>   
    );
}

export default ProfileEditor;