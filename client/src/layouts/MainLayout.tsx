import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

import type { ReactNode } from "react";
import {useState} from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

interface Props {
    children: ReactNode;
}

function MainLayout({ children }: Props) {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <main className="min-h-screen bg-[#0B0B0F] text-[#F2F2F2] overflow-x-hidden">
            <div
                className={`
                    fixed
                    top-0
                    left-0
                    h-full
                    w-72
                    bg-[#111827]
                    border-r border-[#2A2E38]
                    z-20
                    transition-transform
                    duration-300
                    ease-out
                    md:hidden
                    ${menuOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Mobile menu content goes here */}
                <div className="flex flex-col h-full p-8">
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="
                            absolute
                            top-5
                            right-5
                            p-2
                            rounded-lg
                            hover:bg-slate-800
                            transition-colors
                        "
                    >
                        <X className="w-6 h-6 text-slate-300" />
                    </button>

                    <div className="mb-12">
                        <h2 className="text-2xl font-bold tracking-wide">
                            <span className="text-cyan-400">Vid</span>
                            <span className="text-white">Keys</span>
                        </h2>
                    </div>

                    <nav className="flex flex-col gap-6 text-lg">
                        <Link 
                            to="/features"
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-cyan-400 transition"
                        >
                            Features
                        </Link>

                        <Link 
                            to="/features"
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-cyan-400 transition"
                        >
                            Download
                        </Link>

                        <Link 
                            to="/features"
                            onClick={() => setMenuOpen(false)}
                            className="hover:text-cyan-400 transition"
                        >
                            About
                        </Link>
                    </nav>

                    <div className="mt-auto flex flex-col gap-4">
                        <button className="
                            border border-cyan-400
                            text-cyan-400
                            rounded-lg
                            py-2
                            hover:bg-cyan-400
                            hover:text-black
                            transition
                        ">
                            Login
                        </button>

                        <button className="
                            bg-cyan-400
                            text-black
                            rounded-lg
                            py-2
                            hover:bg-cyan-300
                            transition
                        ">
                            Register
                        </button>
                    </div>
                </div>
            </div>
            
            {menuOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        bg-black/50
                        z-10
                        md:hidden
                    "
                    onClick={() => setMenuOpen(false)}
                />
            )}

            <div
                className={`
                    relative
                    z-10
                    transition-transform
                    duration-300
                    ease-out
                    ${menuOpen ? "translate-x-72" : "translate-x-0"}
                `}
            >
                <Navbar 
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {children}
                </div>

                <Footer />
            </div>
        </main>
    );
}

export default MainLayout;