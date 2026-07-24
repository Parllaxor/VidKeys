import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    icon: LucideIcon;
    children: ReactNode;
}

function DashboardCard({ title, icon: Icon, children }: Props) {
    return (
        <section
            className="
                bg-[#111827]
                border
                border-[#2A2E38]
                rounded-2xl
                p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-400/50
                hover:shadow-lg
            "
        >
            <div className="flex items-center gap-3 mb-4">
                <Icon className="w-6 h-6 text-cyan-400" />

                <h2 className="text-xl font-semibold text-white">
                    {title}
                </h2>
            </div>

            {children}
        </section>
    );
}

export default DashboardCard;