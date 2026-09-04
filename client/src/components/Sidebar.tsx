import { NavLink } from "react-router-dom";
import {
    User as UserIcon,
    LayoutDashboard,
    DoorOpen,
    Users,
    Settings,
    ContactRound,
    MessageCircle,
    Menu,
    X,
} from "lucide-react";
import { useState } from "react";
import { getAvatarById } from "../users/avatars";
import { getCurrentUser } from "../users/currentUser";

const navItems = [
    { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/rooms", label: "Rooms", icon: DoorOpen },
    { to: "/users", label: "Users", icon: Users },
    { to: "/friends", label: "Friends", icon: ContactRound },
    { to: "/chat", label: "Chats", icon: MessageCircle },
    { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const user = getCurrentUser();
    const closeMenu = () => setIsOpen(false);

    if (!user) {
        return <div>ERROR: User not found</div>;
    }

    const avatar = getAvatarById(user.avatarId);
    const avatarImage = user.avatarUrl ?? avatar?.image;

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                className={`fixed top-4 z-[60] rounded-xl border border-slate-700 bg-[#111827] p-3 text-slate-300 transition-all duration-300 hover:border-cyan-400/50 hover:bg-slate-800 hover:text-cyan-400 md:hidden ${
                    isOpen ? "left-48" : "left-4"
                }`}
            >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {isOpen && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                />
            )}

            <section
                className={`fixed left-0 top-0 z-50 flex h-screen w-64 max-w-[85vw] flex-col border-r border-[#2A2E38] bg-[#111827] transition-transform duration-300 ease-in-out md:translate-x-0 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="px-6 py-6">
                    <h2 className="text-2xl font-extrabold">
                        <span className="text-cyan-400">Vid</span>
                        <span className="text-white">Keys</span>
                    </h2>
                </div>

                <nav className="mt-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                onClick={closeMenu}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg px-6 py-3 transition-all duration-200 ${
                                        isActive
                                            ? "bg-slate-800 text-cyan-400"
                                            : "text-slate-300 hover:bg-slate-800 hover:text-cyan-400"
                                    }`
                                }
                            >
                                <Icon className="h-5 w-5" />
                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="mt-auto border-t border-[#2A2E38] p-6">
                    <NavLink
                        to="/profile"
                        onClick={closeMenu}
                        className="flex items-center gap-4 rounded-xl p-3 transition-colors duration-200 hover:bg-slate-800"
                    >
                        <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-700">
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
                            <p className="font-semibold text-white">{user.displayName}</p>
                            <p className="text-sm text-slate-400">View Profile</p>
                        </div>
                    </NavLink>
                </div>
            </section>
        </>
    );
}

export default Sidebar;
