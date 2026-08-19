import { getUserById } from "../users/userDatabase";
import { useLocation } from "react-router-dom";

function Topbar() {

    const user = getUserById("test");
    const location = useLocation();

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

            <div className="hidden text-slate-400 sm:block">
                Welcome, {user.displayName}
            </div>
        </header>
    );
}

export default Topbar;