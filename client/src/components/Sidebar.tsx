import { NavLink } from "react-router-dom";
import { User as UserIcon,
    LayoutDashboard, 
    DoorOpen, 
    Users, 
    Settings, 
    ContactRound,
    Menu,
    X,
} from "lucide-react";
import { getAvatarById } from "../users/avatars";
import { getUserById } from "../users/userDatabase";
import { useState } from "react";

function Sidebar () {
    const user = getUserById("test");

    if (!user) {
        return <div>ERROR: User not found</div>;
    }

    const avatar = getAvatarById(user.avatarId);
    const avatarImage = user.avatarUrl ?? avatar?.image;

    const [isOpen, setIsOpen] = useState(false);
    const closeMenu = () => setIsOpen(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`
                    fixed
                    top-4
                    z-[60]
                    rounded-xl
                    border
                    border-slate-700
                    bg-[#111827]
                    p-3
                    text-slate-300
                    transition-all
                    duration-300
                    hover:border-cyan-400/50
                    hover:bg-slate-800
                    hover:text-cyan-400
                    md:hidden
                    ${isOpen ? "left-48" : "left-4"}
                `}
            >
                {isOpen ? (
                    <X className="h-5 w-5" />
                ) : (
                    <Menu className="h-5 w-5" />
                )}
            </button>

            {isOpen && (
                <div
                    onClick={closeMenu}
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/50
                        md:hidden
                    "
                />
            )}

            <section className={`
                fixed
                left-0
                top-0
                z-50
                h-screen
                w-64
                max-w-[85vw]
                bg-[#111827]
                border-r
                border-[#2A2E38]
                flex
                flex-col
                transition-transform
                duration-300
                ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}>
                {/* Logo */}
                <div className="px-6 py-6">
                    <h2 className="text-2xl font-extrabold">
                        <span className="text-cyan-400">Vid</span>
                        <span className="text-white">Keys</span>
                    </h2>
                </div>
                
                {/* Navigation */}
                <nav className="mt-4">
                    <NavLink
                        to="/dashboard"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `
                            flex
                            items-center
                            gap-3
                            px-6
                            py-3
                            rounded-lg
                            transition-all
                            duration-200
                            ${
                                isActive
                                    ? "bg-slate-800 text-cyan-400"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                            }
                            `
                        }
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        <span>Dashboard</span>
                    </NavLink>

                    <NavLink
                        to="/rooms"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `
                            flex
                            items-center
                            gap-3
                            px-6
                            py-3
                            rounded-lg
                            transition-all
                            duration-200
                            ${
                                isActive
                                    ? "bg-slate-800 text-cyan-400"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                            }
                            `
                        }
                    >
                        <DoorOpen className="w-5 h-5" />
                        <span>Rooms</span>
                    </NavLink>

                    <NavLink
                        to="/users"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `
                            flex
                            items-center
                            gap-3
                            px-6
                            py-3
                            rounded-lg
                            transition-all
                            duration-200
                            ${
                                isActive
                                    ? "bg-slate-800 text-cyan-400"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                            }
                            `
                        }
                    >
                        <Users className="w-5 h-5" />
                        <span>Users</span>
                    </NavLink>

                    <NavLink
                        to="/friends"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `
                            flex
                            items-center
                            gap-3
                            px-6
                            py-3
                            rounded-lg
                            transition-all
                            duration-200
                            ${
                                isActive
                                    ? "bg-slate-800 text-cyan-400"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                            }
                            `
                        }
                    >
                        <ContactRound className="w-5 h-5" />
                        <span>Friends</span>
                    </NavLink>

                    <NavLink
                        to="/settings"
                        onClick={closeMenu}
                        className={({ isActive }) =>
                            `
                            flex
                            items-center
                            gap-3
                            px-6
                            py-3
                            rounded-lg
                            transition-all
                            duration-200
                            ${
                                isActive
                                    ? "bg-slate-800 text-cyan-400"
                                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                            }
                            `
                        }
                    >
                        <Settings className="w-5 h-5" />
                        <span>Settings</span>
                    </NavLink>

                </nav>

                {/* Profile */}
                <div className="mt-auto border-t border-[#2A2E38] p-6">
                    
                    <NavLink 
                        to="/profile"
                        onClick={closeMenu}
                        className="
                        flex
                        items-center
                        gap-4
                        p-3
                        rounded-xl
                        hover:bg-slate-800
                        transition-colors
                        duration-200">

                        <div className="
                            w-12 h-12
                            rounded-full
                            overflow-hidden
                            bg-slate-700
                            flex
                            items-center
                            justify-center
                        ">
                            {avatarImage ? (
                                <img
                                    src={avatarImage}
                                    alt={avatar?.name ?? "Profile avatar"}
                                    className="h-12 w-12 rounded-full object-cover"
                                    />
                            ) : (
                                <UserIcon className="h-12 w-12 text-slate-400" />
                            )}
                        </div>

                        <div>
                            <p className="font-semibold text-white">
                                {user.displayName}
                            </p>
                            
                            <p className="text-sm text-slate-400">
                                View Profile
                            </p>
                        </div>
                    </NavLink>
                </div>

            </section>
        </>
    );
}

export default Sidebar;