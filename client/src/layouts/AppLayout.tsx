import type { ReactNode } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

interface Props {
    children: ReactNode;
}

function AppLayout({ children }: Props) {
    return (
        <main className="flex">
            <Sidebar />

            <div className="md:ml-64 flex-1">
                <Topbar />

                <div className="p-8">
                    {children}
                </div>
            </div>

        </main>
    );
}

export default AppLayout;