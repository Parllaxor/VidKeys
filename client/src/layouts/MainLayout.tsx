import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

function MainLayout({ children }: Props) {
    return (
        <main
            style={{
                minHeight: "100vh",
                backgroundColor: "#0B0B0F",
                color: "#F2F2F2",
                padding: "2rem",
            }}
        >
            {children}
        </main>
    );
}

export default MainLayout;