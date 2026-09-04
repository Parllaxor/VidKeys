import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../users/currentUser";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    if (!getCurrentUser()) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;
