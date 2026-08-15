import { getUserById } from "../users/userDatabase";
import { useState } from "react";

function Topbar() {

const [user, setUser] = useState(() => getUserById("test"));

    if (!user) {
        return <div>ERROR: User not found</div>;
    }
    
    return (
        <header className="
            h-16
            border-b
            border-[#2A2E38]
            flex
            items-center
            justify-between
            px-8
        ">
            <div>
                <h1 className="text-xl font-semibold text-white">
                    Dashboard
                </h1>
            </div>

            <div className="hidden text-slate-400 sm:block">
                Welcome, {user.displayName}
            </div>
        </header>
    );
}

export default Topbar;