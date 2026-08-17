import { getAvatarById } from "../users/avatars";
import { useNavigate } from "react-router-dom";
import { User as UserIcon } from "lucide-react";
import type { User } from "../users/user";

interface FriendCardProps {
    friend: User;
    onRemove: (friendId: string) => void;
}

function FriendCard({ friend, onRemove }: FriendCardProps) {
    const navigate = useNavigate();

    const avatar = getAvatarById(friend.avatarId);

    return (
        <div
            className="
                flex
                flex-col
                gap-4
                rounded-2xl
                border
                border-slate-700
                bg-[#111827]
                p-4
                transition-all
                duration-200
                hover:border-slate-600
                md:flex-row
                md:items-center
                md:justify-between
            "
        >
            {/* Friend Info */}
            <div className="flex items-center gap-4">
                <div className="relative">
                    <div className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-full
                        border
                        border-slate-600
                        bg-slate-900
                    ">
                        {avatar ? (
                            <img
                                src={avatar.image}
                                alt={`${friend.displayName}'s avatar`}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <UserIcon className="h-7 w-7 text-slate-500" />
                        )}
                    </div>

                    {/* Status */}
                    <div
                        className={`
                            absolute
                            bottom-0
                            right-0
                            h-3.5
                            w-3.5
                            rounded-full
                            border-2
                            border-[#111827]
                            ${
                                friend.status === "online"
                                    ? "bg-cyan-400"
                                    : friend.status === "away"
                                    ? "bg-yellow-400"
                                    : friend.status === "dnd"
                                    ? "bg-red-400"
                                    : "bg-slate-500"
                            }
                        `}
                    />
                </div>

                <div>
                    <h3 className="font-semibold text-white">
                        {friend.displayName}
                    </h3>

                    <div className="flex items-center gap-2">
                        <p className="text-sm text-slate-400">
                            @{friend.username}
                        </p>

                        <span className="text-xs text-slate-600">
                            •
                        </span>

                        <p
                            className={`
                                text-xs
                                font-medium
                                ${
                                    friend.status === "online"
                                        ? "text-cyan-400"
                                        : friend.status === "away"
                                        ? "text-yellow-400"
                                        : friend.status === "dnd"
                                        ? "text-red-400"
                                        : "text-slate-500"
                                }
                            `}
                        >
                            {friend.status === "online"
                                ? "Online"
                                : friend.status === "away"
                                ? "Away"
                                : friend.status === "dnd"
                                ? "Do Not Disturb"
                                : "Offline"}
                        </p>
                    </div>

                    <p className="mt-1 max-w-md text-sm text-slate-500">
                        {friend.bio.length > 27
                            ? friend.bio.slice(0, 27) + "..."
                            : friend.bio}
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                        Last active:{" "}
                        {new Date(
                            friend.lastActive
                        ).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Buttons */}
            <div className="flex w-full items-center gap-2 md:w-auto">
                <button
                    type="button"
                    className="
                        flex-1
                        md:flex-none
                        rounded-xl
                        border
                        border-cyan-400/40
                        bg-cyan-950/30
                        px-3
                        py-2
                        sm:text-sm
                        text-xs
                        font-semibold
                        text-cyan-300
                        transition-all
                        duration-200
                        hover:border-cyan-400
                        hover:bg-cyan-400/10
                    "
                >
                    Invite
                </button>

                <button
                    type="button"
                    className="
                        flex-1
                        md:flex-none
                        rounded-xl
                        border
                        border-slate-600
                        px-3
                        py-2
                        sm:text-sm
                        text-xs
                        font-semibold
                        text-slate-300
                        transition-all
                        duration-200
                        hover:border-cyan-400/50
                        hover:bg-cyan-950/40
                        hover:text-cyan-300
                    "
                >
                    Chat
                </button>

                <button
                    type="button"
                    onClick={() =>
                        navigate(`/profile/${friend.id}`)
                    }
                    className="
                        flex-1
                        md:flex-none
                        rounded-xl
                        border
                        border-slate-600
                        px-3
                        py-2
                        sm:text-sm
                        text-xs
                        font-semibold
                        text-slate-300
                        transition-all
                        duration-200
                        hover:border-cyan-400/50
                        hover:bg-cyan-950/40
                        hover:text-cyan-300
                    "
                >
                    Profile
                </button>

                <button
                    type="button"
                    onClick={() => onRemove(friend.id)}
                    className="
                        flex-1
                        md:flex-none
                        rounded-xl
                        border
                        border-red-400/30
                        px-3
                        py-2
                        sm:text-sm
                        text-xs
                        font-semibold
                        text-red-400
                        transition-all
                        duration-200
                        hover:border-red-400/60
                        hover:bg-red-950/30
                        hover:text-red-300
                    "
                >
                    Remove
                </button>
            </div>
        </div>
    );
}

export default FriendCard;