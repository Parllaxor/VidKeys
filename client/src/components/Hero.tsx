import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-16">

                {/* Left Side Hero */}
                <div className="max-w-xl space-y-6 text-center lg:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        Your place to connect...
                        <br />
                        No matter where you are.
                    </h1>
                    <p className="text-lg text-slate-300 max-w-2xl">
                        Connect with your friends and family in a fun and engaging way.
                    </p>

                    <div className="flex justify-center lg:justify-start gap-4">
                        <Link to="/register" className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 font-semibold">
                            Get Started
                        </Link>

                        <Link to="/features" className="px-6 py-3 rounded-lg border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300">
                            Learn More
                        </Link>
                    </div>
                </div>

                {/* Right Side Hero */}
                <div className="w-full max-w-[450px] rounded-3xl bg-[#111827] border border-slate-700 shadow-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-slate-700">
                        <div>
                            <h2 className="text-xl font-semibold">Friends Room</h2>
                            <p className="text-sm text-slate-400">
                                Hanging out together
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-cyan-400"></div>
                            <span className="text-sm text-cyan-400 font-medium">
                                Live
                            </span>
                        </div>
                    </div>

                    {/* Participants */}
                    <div className="p-4">
                        {/* Alex */}
                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-800 transition-colors duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-cyan-500 flex items-center justify-center text-xl font-extrabold">
                                    A
                                </div>

                                <div>
                                    <h3 className="font-medium">Alex</h3>
                                    <p className="text-sm text-slate-400">
                                        Online
                                    </p>
                                </div>
                            </div>

                            <div className="w-3 h-3 rounded-full bg-green-400"></div>
                        </div>

                        {/* Sarah */}
                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-800 transition-colors duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-purple-500 flex items-center justify-center text-xl font-extrabold">
                                    S
                                </div>

                                <div>
                                    <h3 className="font-medium">Sarah</h3>
                                    <p className="text-sm text-slate-400">
                                        Do not disturb
                                    </p>
                                </div>
                            </div>

                            <div className="w-3 h-3 rounded-full bg-orange-300"></div>
                        </div>

                        {/* Todd */}
                        <div className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-800 transition-colors duration-300">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 flex-shrink-0 rounded-full bg-emerald-500 flex items-center justify-center text-xl font-extrabold">
                                    T
                                </div>

                                <div>
                                    <h3 className="font-medium">Todd</h3>
                                    <p className="text-sm text-slate-400">
                                        Offline
                                    </p>
                                </div>
                            </div>

                            <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        </div>
                    </div>

                    {/* Current Activity */}
                    <div className="border-t border-slate-700 p-6">
                        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                            Current Activity
                        </h3>

                        <div className="mt-4 rounded-2xl bg-slate-800/70 border border-slate-700 p-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-cyan-500 flex items-center justify-center text-2xl">
                                    🎮
                                </div>

                                <div>
                                    <h4 className="font-semibold text-white">
                                        Chess Match
                                    </h4>

                                    <p className="text-sm text-slate-400">
                                        Alex vs Sarah
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4">
                            <button className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 font-semibold">
                                Spectate Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;