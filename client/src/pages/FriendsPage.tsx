import { getUserById } from "../users/userDatabase";
import { useNavigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Footer from "../components/Footer";

function FriendsPage() {
    const navigate = useNavigate();

    const currentUserId = "test";
    const currentUser = getUserById(currentUserId);

    const friends = currentUser
        ? currentUser.friends
            .map((friendId) => getUserById(friendId))
            .filter((friend): friend is NonNullable<typeof friend> => friend !== undefined)
        : [];

    return (
        <AppLayout>
            <div className="mt-8">
                <div className="rounded-3xl border border-slate-700 bg-slate-950/60 p-6">
                    <h1 className="text-3xl font-bold text-white">
                        Friends
                    </h1>

                    <p className="mt-2 text-slate-400">
                        View and connect with your friends.
                    </p>
                </div>

                <div className="mt-8">
                    {friends.length === 0 ? (
                        <div className="rounded-2xl border border-slate-700 bg-[#111827] p-8 text-center">
                            <p className="text-slate-400">
                                You don't have any friends yet.
                                Visit the users page to find new friends!
                            </p>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {friends.map((friend) => (
                                <div
                                    key={friend.id}
                                    className="rounded-2xl border border-slate-700 bg-[#111827] p-5"
                                >
                                    <h2 className="text-lg font-semibold text-white">
                                        {friend.displayName}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-400">
                                        @{friend.username}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-950/60 p-6 text-center">
                        <h2 className="text-lg font-semibold text-white">
                            Looking for more friends?
                        </h2>

                        <p className="mt-2 text-sm-text-slate-400">
                            Find other VidKeys users and connect with new people.
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

export default FriendsPage