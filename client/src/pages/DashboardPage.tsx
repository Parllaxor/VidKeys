import { Link } from "react-router-dom";

import {
    DoorOpen,
    Users,
    Clock,
    Calendar
} from "lucide-react";

import AppLayout from "../layouts/AppLayout";
import DashboardHeader from "../components/DashboardHeader";
import DashboardCard from "../components/DashboardCard";

function DashboardPage() {
    return (
        <AppLayout>
            <DashboardHeader />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <DashboardCard title="Your Room"
                                icon={DoorOpen}>
                    <p className="text-slate-400 mb-6">
                        Create a space for your friends to join you.
                    </p>

                    <Link
                        to="/rooms"
                        className="
                            bg-cyan-400
                            text-black
                            px-5
                            py-2
                            rounded-lg
                            font-semibold
                            hover:bg-cyan-300
                            transition-colors
                        "
                    >
                        Create Room
                    </Link>
                </DashboardCard>
                
                <DashboardCard title="Friends Online"
                                icon={Users}>
                    <p className="text-slate-400 mb-6">
                        No friends are online right now.
                    </p>

                    <Link
                        to="/friends"
                        className="
                            border
                            border-cyan-400
                            text-cyan-400
                            px-5
                            py-2
                            rounded-lg
                            font-semibold
                            hover:bg-cyan-400
                            hover:text-black
                            transition-colors
                        "
                    >
                        Invite Friends
                    </Link>
                </DashboardCard>

                <DashboardCard title="Recent Rooms"
                                icon={Clock}>
                    <p className="text-slate-400 mb-6">
                        Haven't visited any rooms recently.
                    </p>

                    <Link
                        to="/rooms"
                        className="
                            border
                            border-cyan-400
                            text-cyan-400
                            px-5
                            py-2
                            rounded-lg
                            font-semibold
                            hover:bg-cyan-400
                            hover:text-black
                            transition-colors
                        "
                    >
                        Recent Rooms
                    </Link>
                </DashboardCard>

                <DashboardCard title="Scheduled Events"
                                icon={Calendar}>
                    <p className="text-slate-400 mb-6">
                        No events planned.
                    </p>

                    <Link
                        to="/schedule"
                        className="
                            border
                            border-cyan-400
                            text-cyan-400
                            px-5
                            py-2
                            rounded-lg
                            font-semibold
                            hover:bg-cyan-400
                            hover:text-black
                            transition-colors
                        "
                    >
                        Plan Event
                    </Link>
                </DashboardCard>
            </div>
        </AppLayout>
    );
}

export default DashboardPage;