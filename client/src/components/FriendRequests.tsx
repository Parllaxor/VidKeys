import { getUserById } from "../users/userDatabase";
import { getAvatarById } from "../users/avatars";
import { User as UserIcon } from "lucide-react";

interface FriendRequestsProps {
    requests: string[];
    onAccept: (requestId: string) => void;
    onDecline: (requestId: string) => void;
    onViewProfile: (requestId: string) => void;
}

function FriendRequests({
    requests,
    onAccept,
    onDecline,
    onViewProfile,
}: FriendRequestsProps) {

    const requestUsers = requests
        .map((requestId) => getUserById(requestId))
        .filter(
            (request): request is NonNullable<typeof request> =>
                request !== undefined
        );

    if (requestUsers.length === 0) {
        return (
            <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8 text-center">
                <p className="text-slate-400">
                    You don't have any friend requests right now.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">
            {requestUsers.map((request) => {
                const avatar = getAvatarById(request.avatarId);

                return (
                    <div
                        key={request.id}
                        className="
                            flex
                            flex-col
                            gap-4
                            md:flex-row
                            md:items-center
                            md:justify-between
                            rounded-2xl
                            border
                            border-slate-700
                            bg-[#111827]
                            p-4
                            transition-all
                            duration-200
                            hover:border-slate-600
                        "
                    >
                        {/* Request Info */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-slate-600 bg-slate-900">
                                    {avatar ? (
                                        <img
                                            src={avatar.image}
                                            alt={`${request.displayName}'s avatar`}
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
                                            request.status === "online"
                                                ? "bg-cyan-400"
                                                : request.status === "away"
                                                ? "bg-yellow-400"
                                                : request.status === "dnd"
                                                ? "bg-red-400"
                                                : "bg-slate-500"
                                        }
                                    `}
                                />
                            </div>

                            <div>
                                <h3 className="font-semibold text-white">
                                    {request.displayName}
                                </h3>

                                <div className="flex items-center gap-2">
                                    <p className="text-sm text-slate-400">
                                        @{request.username}
                                    </p>

                                    <span className="text-xs text-slate-600">
                                        •
                                    </span>

                                    <p
                                        className={`
                                            text-xs
                                            font-medium
                                            ${
                                                request.status === "online"
                                                    ? "text-cyan-400"
                                                    : request.status === "away"
                                                    ? "text-yellow-400"
                                                    : request.status === "dnd"
                                                    ? "text-red-400"
                                                    : "text-slate-500"
                                            }
                                        `}
                                    >
                                        {request.status === "online"
                                            ? "Online"
                                            : request.status === "away"
                                            ? "Away"
                                            : request.status === "dnd"
                                            ? "Do Not Disturb"
                                            : "Offline"}
                                    </p>
                                </div>

                                <p className="mt-1 text-sm text-slate-500">
                                    {request.bio.length > 27
                                        ? request.bio.slice(0, 27) + "..."
                                        : request.bio}
                                </p>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex w-full items-center gap-2 md:w-auto">
                            <button
                                type="button"
                                onClick={() => onAccept(request.id)}
                                className="
                                    flex-1
                                    md:flex-none
                                    rounded-xl 
                                    bg-cyan-400
                                    px-4 
                                    py-2 
                                    text-xs
                                    sm:text-sm 
                                    font-semibold 
                                    text-black 
                                    transition 
                                    hover:bg-cyan-300"
                            >
                                Accept
                            </button>

                            <button
                                type="button"
                                onClick={() => onViewProfile(request.id)}
                                className="
                                    flex-1
                                    md:flex-none
                                    rounded-xl
                                    border
                                    border-slate-600
                                    px-4
                                    py-2
                                    text-xs
                                    sm:text-sm
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
                                onClick={() => onDecline(request.id)}
                                className="
                                    flex-1
                                    md:flex-none
                                    rounded-xl
                                    border 
                                    border-red-400/30 
                                    px-4 py-2 
                                    text-xs
                                    sm:text-sm 
                                    font-semibold 
                                    text-red-400 
                                    transition 
                                    hover:border-red-400/60 
                                    hover:bg-red-950/30"
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default FriendRequests;