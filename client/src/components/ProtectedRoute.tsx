import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../users/currentUser";
import { useEffect, useState } from "react";
import { restoreCurrentUser } from "../users/currentUser";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        restoreCurrentUser().finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) {
        return null;
    }

    if (!getCurrentUser()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;