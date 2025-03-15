import { Navigate, Outlet } from "react-router";
import useAuthStore from "../stores/useAuthStore";
import { jwtDecode } from "jwt-decode";

const AdminRoute = () => {
    const { token } = useAuthStore();

    if (!token) {
        return <Navigate to={"/login-admin"} replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const isAdmin = decodedToken.role === "Admin";

        if (!isAdmin) {
            return <Navigate to="/" replace />; // Redirect jika bukan admin
        }
    } catch (error) {
        console.error("Invalid token", error);
        return <Navigate to="/login-admin" replace />; // Redirect jika token tidak valid
    }

    return <Outlet />;
};

export default AdminRoute;
