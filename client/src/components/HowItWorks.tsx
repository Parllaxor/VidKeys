import { PlusCircle, UserPlus, Gamepad2 } from "lucide-react";

function HowItWorks() {
    return (
        <section className="max-w-7xl mx-auto px-8 py-24">
            <h2 className="text-4xl font-bold">
                How It Works
            </h2>

            <p className="mt-4 text-lg text-slate-400">
                Get connected with friends in just a few simple steps.
            </p>

            <div className="relative mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">

                <div
                    className="
                        hidden
                        md:block
                        absolute
                        top-32
                        left-[22%]
                        right-[22%]
                        h-[3px]
                        bg-gradient-to-r
                        from-cyan-400/0
                        via-cyan-400/30
                        to-cyan-400/0
                    "
                />

                {/* First Step */}
                <div className="relative z-10 w-full rounded-2xl bg-[#111827] border border-slate-700 shadow-2xl p-8">
                    <span className="absolute top-3 left-5 text-5xl font-extrabold text-cyan-400/5 select-none">
                        01
                    </span>

                    <div className="relative z-10 mt-10">
                        <div className="ml-4 w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                            <PlusCircle className="w-8 h-8 text-cyan-400" />
                        </div>

                        <h3 className="mt-6 text-2xl font-semibold">
                            Create a Room
                        </h3>

                        <p className="mt-3 text-slate-400 leading-relaxed">
                            Create a room where you and your friends can hang out and chat.
                        </p>
                    </div>
                </div>

                {/* Second Step */}
                <div className="relative z-10 w-full rounded-2xl bg-[#111827] border border-slate-700 shadow-2xl p-8">
                    <span className="absolute top-3 left-5 text-5xl font-extrabold text-cyan-400/5 select-none">
                        02
                    </span>

                    <div className="relative z-10 mt-10">
                        <div className="ml-4 w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                            <UserPlus className="w-8 h-8 text-cyan-400" />
                        </div>

                        <h3 className="mt-6 text-2xl font-semibold">
                            Invite your Friends
                        </h3>

                        <p className="mt-3 text-slate-400 leading-relaxed">
                            Invite your friends to join your room and start chatting.
                        </p>
                    </div>
                </div>

                {/* Third Step */}
                <div className="relative z-10 w-full rounded-2xl bg-[#111827] border border-slate-700 shadow-2xl p-8">
                    <span className="absolute top-3 left-5 text-5xl font-extrabold text-cyan-400/5 select-none">
                        03
                    </span>

                    <div className="relative z-10 mt-10">
                        <div className="ml-4 w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
                            <Gamepad2 className="w-8 h-8 text-cyan-400" />
                        </div>

                        <h3 className="mt-6 text-2xl font-semibold">
                            Play and Chat
                        </h3>

                        <p className="mt-3 text-slate-400 leading-relaxed">
                            Play our in-built games while chatting with your friends and have fun!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;