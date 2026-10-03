import { X, MessageCircle } from "lucide-react";

import { useEffect, useState } from "react";
import { getCurrentUser } from "../users/currentUser";
import { getNotifications } from "../services/notificationService";

interface NotificationPanelProps {
    onClose: () => void;
    isOpen: boolean;
}

export default function NotificationPanel({
    onClose,
    isOpen,
}: NotificationPanelProps) {

    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        const user = getCurrentUser();

        if (!user) {
            return;
        }

        getNotifications(user.id).then((data) => {
            console.log("USER NOTIFICATIONS:", data);
            setNotifications(data);
        });
    }, []);

    return (
        <div
            className={`
                fixed
                top-0
                right-0
                z-50
                h-full
                w-full
                max-w-sm
                bg-[#111827]
                border-l
                border-cyan-400/50
                shadow-2xl
                transition-transform
                duration-300
                ease-in-out
                will-change-transform
                ${isOpen ? "translate-x-0" : "translate-x-full"}
            `}
        >
            <div className="
                flex
                items-center
                justify-between
                px-5
                py-4
                border-b
                border-cyan-400/50
            ">
                <h2 className="text-lg font-semibold text-white select-none">
                    Notifications
                </h2>

                <button
                    onClick={onClose}
                    className="
                        p-1
                        text-slate-400
                        hover:text-white
                        transition
                    "
                    aria-label="Close notifications"
                >
                    <X size={20} />
                </button>
            </div>

            <div className="p-4">
                {notifications.length === 0 ? (
                    <div className="
                        rounded-lg
                        border
                        border-cyan-400/50
                        bg-slate-700/20
                        p-4
                    ">
                        <p className="text-sm text-white">
                            Nothing to report.
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                            You're all caught up.
                        </p>
                    </div>
                ) : (
                    notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="
                                rounded-lg
                                border
                                border-cyan-400/50
                                bg-slate-700/20
                                p-4
                                hover:bg-slate-700/30
                                hover:border-cyan-400/70
                                hover:scale-[1.01]
                                hover:shadow-lg
                                transition
                                duration-200
                                mb-3
                            "
                        >
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-cyan-400">
                                    <MessageCircle size={18} />
                                </div>

                                <div>
                                    <p className="text-sm text-white">
                                        {notification.message}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        New message
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}