
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";

const PrivateLayout = () => {
  const location = useLocation();
  const { setRedirect, isAuthenticated } = useAuthContext();
  setRedirect(location.pathname);
  if (!isAuthenticated) {
    return <Navigate to={`/signin?next=${location.pathname}`} />;
  }

  return <Outlet />;
};

export default PrivateLayout;
