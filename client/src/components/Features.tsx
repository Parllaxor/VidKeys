import { Video, DoorOpen, Gamepad2 } from "lucide-react";

function Features() {
    return (
        <section className="max-w-7xl mx-auto px-8 py-24">
            <div className="text-center">
                <h2 className="text-4xl font-bold">
                    Everything you need to stay connected.
                </h2>

                <p className="mt-4 text-lg text-slate-400">
                    Stay close with friends no matter where life takes you.
                </p>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="w-full rounded-2xl bg-[#111827] border border-slate-700 shadow-2xl p-8 hover:-translate-y-2 hover:border-cyan-400 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                        <Video className="w-8 h-8 text-cyan-400" />
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold">
                            Crystal Clear Video
                        </h3>

                        <p className="mt-3 text-slate-400 leading-relaxed">
                                Enjoy high-quality video calls with friends and family, no matter where they are.
                        </p>
                    </div>
                </div>

                <div className="w-full rounded-2xl bg-[#111827] border border-slate-700 shadow-2xl p-8 hover:-translate-y-2 hover:border-cyan-400 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                        <DoorOpen className="w-8 h-8 text-cyan-400" />
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold">
                            Private Rooms
                        </h3>

                        <p className="mt-3 text-slate-400 leading-relaxed">
                            Create your own private spaces where friends can meet, chat, and spend time together whenever and wherever they want.
                        </p>
                    </div>
                </div>

                <div className="w-full rounded-2xl bg-[#111827] border border-slate-700 shadow-2xl p-8 hover:-translate-y-2 hover:border-cyan-400 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                        <Gamepad2 className="w-8 h-8 text-cyan-400" />
                    </div>

                    <div className="mt-6">
                        <h3 className="text-2xl font-semibold">
                            Play Together
                        </h3>

                        <p className="mt-3 text-slate-400 leading-relaxed">
                            Jump into built-in games with friends, or communicate while playing your favorite games together. Enjoy a seamless gaming experience with your friends!
                        </p>
                    </div>
                </div>
            </div>
            
        </section>
    );
}

export default Features;