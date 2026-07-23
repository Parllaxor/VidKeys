import Navbar from "../components/Navbar";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function MainLayout({ children }: Props) {
    return (
        <main className="min-h-screen bg-[#0B0B0F] text-[#F2F2F2]">
            <Navbar />

            <div className="max-w-7xl mx-auto px-8">
                {children}
            </div>
        </main>
    );
}

export default MainLayout;