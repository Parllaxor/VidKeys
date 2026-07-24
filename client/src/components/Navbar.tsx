import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface NavbarProps {
    menuOpen: boolean;
    setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({
    menuOpen,
    setMenuOpen,
}: NavbarProps) {
    return (
        <nav className="sticky top-0 z-30 flex items-center justify-between h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#2A2E38] md:static">
            <Link to="/">
                <span className="text-2xl font-extrabold text-cyan-400">Vid</span>
                <span className="text-2xl font-extrabold text-[#F2F2F2]">Keys</span>
            </Link>

            <div className="hidden lg:flex gap-8 text-slate-300">
                <Link to="/features" className="group hover:text-cyan-400 transition-colors duration-300">
                    <span className="relative inline-block">
                        Features
                        <span className ="
                            absolute
                            left-0
                            -bottom-1
                            h-0.5
                            w-0
                            bg-cyan-400
                            transition-all
                            duration-300
                            group-hover:w-full">
                        </span>
                    </span>
                </Link>
                <Link to="/download" className="group hover:text-cyan-400 transition-colors duration-300">
                    <span className="relative inline-block">
                        Download
                        <span className="
                            absolute
                            left-0
                            -bottom-1
                            h-0.5
                            w-0
                            bg-cyan-400
                            transition-all
                            duration-300
                            group-hover:w-full">
                        </span>
                    </span>
                </Link>
                <Link to="/about" className="group hover:text-cyan-400 transition-colors duration-300">
                    <span className="relative inline-block">
                        About
                        <span className="
                            absolute
                            left-0
                            -bottom-1
                            h-0.5
                            w-0
                            bg-cyan-400
                            transition-all
                            duration-300
                            group-hover:w-full">
                        </span>
                    </span>
                </Link>
            </div>

            <div className="hidden lg:flex gap-8 text-slate-300">
                <Link to="/login"
                className="px-4 py-2 rounded-md hover:bg-slate-700 hover:text-cyan-400 transition-colors duration-200"
                >
                    <span>Login</span>
                </Link>
                <Link to="/register"
                className="px-4 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600 transition-colors duration-200"
                >
                    <span>Register</span>
                </Link>
            </div>

            <button 
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-slate-800 transition-colors"
            >
                {menuOpen ? (
                    <X className="w-7 h-7 text-slate-300" />
                ) : (
                    <Menu className="w-7 h-7 text-slate-300" />
                )}
            </button>
        </nav>
    );
}

export default Navbar;