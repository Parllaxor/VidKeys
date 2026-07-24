import { Link } from "react-router-dom";

function CTA () {
    return (
        <section className="max-w-7xl mx-auto px-8 py-32">
            <div className="
            relative
            overflow-hidden
            rounded-3xl
            border
            border-cyan-400/20
            bg-[#111827]
            p-16
            text-center">
                <div className="
                absolute
                -top-32
                left-1/2
                h-72
                w-72
                -translate-x-1/2
                rounded-full
                bg-cyan-500/20
                blur-3xl"> </div>

                <div className="relative z-10">
                    <p className="text-cyan-400/50 font-semibold uppercase tracking-widest text-sm">
                        Join Vidkeys
                    </p>

                    <h2 className="mt-4 text-5xl font-bold leading-tight">
                        Ready to create
                        <br />
                        your own room?
                    </h2>

                    <p className="mt-6 max-w-2xl mx-auto text-lg text-cyan-400/80 leading-relaxed">
                        Build your own unique space and invite the people who matter most.
                        <br />
                        Start creating memories instead of just making calls.
                    </p>

                    <div className="w-1/2 h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent mx-auto my-10"></div>

                    <div className="mt-12 flex justify-center gap-4">
                        <Link to="/register" className="px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors duration-300 font-semibold">
                            Get Started
                        </Link>

                        <Link to="/features" className="px-6 py-3 rounded-lg border border-slate-600 hover:border-cyan-400 hover:text-cyan-400 transition-colors duration-300">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
            
        </section>
    );
}

export default CTA;