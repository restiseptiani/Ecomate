import { Navigate, Outlet } from "react-router";
import useAuthStore from "../stores/useAuthStore";

const GuestRoute = ({ redirectPath }) => {
    const { token } = useAuthStore();

    if (token) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default GuestRoute;
