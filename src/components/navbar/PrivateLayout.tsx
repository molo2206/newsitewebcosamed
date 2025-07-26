import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";

const PrivateLayout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    // Capture le chemin complet avec les paramètres (pathname + search)
    const next = location.pathname + location.search;
    return (
      <Navigate
        to={`/auth/signin?next=${encodeURIComponent(next)}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default PrivateLayout;
