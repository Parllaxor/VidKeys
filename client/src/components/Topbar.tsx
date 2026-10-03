import { getCurrentUser } from "../users/currentUser";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Bell } from "lucide-react";
import NotificationPanel from "./NotificationPanel";

function Topbar() {

    const user = getCurrentUser();
    const location = useLocation();
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    if (!user) {
        return <div>ERROR: User not found</div>;
    }

    if (!location) {
        return <div>ERROR: 404 Page not found</div>
    }

    const pageTitles: Record<string, string> = {
        "/dashboard": "Dashboard",
        "/rooms": "Rooms",
        "/users": "Users",
        "/profile": "Profile",
        "/settings": "Settings",
        "/friends": "Friends",
    };

    const currentPage = pageTitles[location.pathname] ?? "VidKeys";
    
    return (
        <header className="
            h-16
            border-b
            border-[#2A2E38]
            flex
            items-center
            justify-between
            px-8
            pl-20
            sm:pl-8
        ">
            <div>
                <h1 className="text-xl font-semibold text-white">
                    {currentPage}
                </h1>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setNotificationsOpen(true)}
                    className="text-slate-400 hover:text-white transition"
                    aria-label="Notifications"
                >
                    <Bell size={20} />
                </button>

                <div className="hidden text-slate-400 sm:block">
                    Welcome, {user.displayName}
                </div>
            </div>

            <NotificationPanel
                onClose={() => setNotificationsOpen(false)}
                isOpen={notificationsOpen}
            />
        </header>
    );
}

export default Topbar;
