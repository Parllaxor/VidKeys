import { getUserById } from "../users/userDatabase";
import { useEffect, useState } from "react";

const DISPLAY_TEXTS = [
        "Your central hub for everything VidKeys",
        "Hop into a call or join a room",
        "Decorate, design, and articulate your own space",
        "Play games with your friends!",
        "Everything you need, all in one place.",
        "No better way to play",
        "The best place to hang out with friends",
        "Everyone needs time with those they love",
        "True socializing makes happier people",
        "The second best thing to meeting in person",
        "Jump into the action, or start creating",
];

function DashboardHeader() {

    const currentUser = getUserById("test")
    
    const [subheading, setSubheading] = useState("");

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * DISPLAY_TEXTS.length);
        setSubheading(DISPLAY_TEXTS[randomIndex])
    }, []);

    return (
        <section className="flex items-center justify-between py-8">
            <div>
                <h1 className="text-3xl font-bold text-white">
                    Welcome Back, {currentUser?.displayName}!
                </h1>

                <p className="mt-2 text-slate-400">
                    {subheading}
                </p>
            </div>
        </section>
    );
}

export default DashboardHeader;