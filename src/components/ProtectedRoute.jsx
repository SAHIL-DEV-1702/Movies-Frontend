import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children, role }) => {
    const { user } = useAuth();

    if (!user.token) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;

    return children;
};

export default ProtectedRoute;
