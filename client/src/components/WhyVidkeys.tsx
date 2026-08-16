import { Home, Users, Gamepad2, Video, MessageCircle, Rocket, Telescope, Trophy, Cat, Bed, TreePalm } from "lucide-react";
import { NavLink } from "react-router-dom";

function WhyVidkeys() {
    return (
        <section className="max-w-7xl mx-auto px-8 py-24">
            <div className="rounded-3xl bg-[#111827] border border-slate-700 shadow-2xl p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    
                    {/* Left Side */}
                    <div>
                        <p className="text-cyan-400 font-semibold uppercase tracking-widest text-sm">
                            Personalized Rooms
                        </p>

                        <h2 className="mt-4 text-5xl font-bold leading-tight">
                            A place that
                            <br />
                            feels like yours.
                        </h2>

                        <p className="mt-6 text-lg text-slate-300 leading-relaxed">
                            Create a room that's uniquely yours -
                            a place where friends and family can always meet, no matter the distance.
                            <br />
                            <br />
                            Drop in to chat, play games, celebrate milestones, or simply spend time together. 
                            VidKeys makes long-distance friendships feel a little closer to home.
                        </p>

                        {/* Benefits */}
                        <div className="mt-8 space-y-6">
                            <div className="flex gap-4 hover:translate-x-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                                    {/* Icon */}
                                    <Home className="w-6 h-6 text-cyan-400" />
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        Your Own Space
                                    </h4>

                                    <p className="text-slate-400 text-sm">
                                        Create a room that reflects who you are.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 hover:translate-x-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                                    {/* Icon */}
                                    <Users className="w-6 h-6 text-cyan-400" />
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        Friends Welcome
                                    </h4>

                                    <p className="text-slate-400 text-sm">
                                        Invite friends to your room, or join them in theirs!
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 hover:translate-x-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                                    {/* Icon */}
                                    <Gamepad2 className="w-6 h-6 text-cyan-400" />
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        Shared Experiences
                                    </h4>

                                    <p className="text-slate-400 text-sm">
                                        Games, Entertainment, Enjoyment, all bundled up in one place.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 hover:translate-x-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                                    {/* Icon */}
                                    <Video className="w-6 h-6 text-cyan-400" />
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        Face to Face Chats
                                    </h4>

                                    <p className="text-slate-400 text-sm">
                                        Video call and chat with friends and family whenever and wherever.
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-4 hover:translate-x-1 transition-all duration-300">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
                                    {/* Icon */}
                                    <MessageCircle className="w-6 h-6 text-cyan-400" />
                                </div>

                                <div>
                                    <h4 className="font-semibold">
                                        Seamless communication
                                    </h4>

                                    <p className="text-slate-400 text-sm">
                                        Text, plan, and schedule.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10">
                            <NavLink
                                // If not logged in, route to register eventually
                                to="/rooms"
                                className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 font-semibold">
                                Create Your Room
                            </NavLink>
                        </div>
                    </div>

                    {/* Right Side */}

                    <div className="rounded-3xl bg-slate-900/50 border-slate-700 shadow-xl overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-slate-700">
                            <div>
                                <h3 className="text-xl font-semibold">
                                    My Room
                                </h3>

                                <p className="text-sm text-slate-400">
                                    Personalized Space
                                </p>
                            </div>

                            <div className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm font-medium">
                                Customizable
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Details */}
                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Theme
                                </p>

                                <div className="mt-1">
                                    <p className="text-lg font-medium">
                                        Midnight Galaxy
                                    </p>
                                    <p className="text-md font-medium text-[#595959]">
                                        Fantasy Woods
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Ambience
                                </p>

                                <div className="mt-1">
                                    <p className="text-lg font-medium">
                                        Rainy Evening
                                    </p>
                                    <p className="text-md font-medium text-[#595959]">
                                        Winter Wonderland
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Favorite Activity
                                </p>

                                <div className="mt-1">
                                    <p className="text-lg font-medium">
                                        Game Night
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-slate-700 pt-6">
                                <p className="text-sm uppercase tracking-wide text-slate-500">
                                    Decorations
                                </p>

                                <div className="mt-4 flex gap-3">
                                    {/* Icons */}
                                    <div className="p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300">
                                        <Rocket className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300">
                                        <Telescope className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300">
                                        <Trophy className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300">
                                        <Cat className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300">
                                        <Bed className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="p-2 rounded-lg hover:bg-cyan-500/10 transition-all duration-300">
                                        <TreePalm className="w-4 h-4 text-cyan-400" />
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-slate-700 p-6">
                                <p className="text-slate-300 italic">
                                    "Friends can always stop by."
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default WhyVidkeys;