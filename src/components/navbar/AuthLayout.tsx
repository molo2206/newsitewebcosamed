import { Navigate, Outlet, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../context";

const AuthLayout = () => {
  const [searchParams] = useSearchParams()
  const {isAuthenticated } = useAuthContext();
   const redirectUrl = searchParams.get("next") || "/job_openings/userHome"

  if (isAuthenticated) {
    return <Navigate to={redirectUrl} />;
  }

  return <Outlet />;
};

export default AuthLayout;
