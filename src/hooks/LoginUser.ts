import { useState } from "react";
import { useAuthContext } from "../context";
import AuthService from "../services/AuthService";
import { useSearchParams } from "react-router-dom";

export default function UseLogin() {
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const {
    saveSession,
    saveUser,
    errorNotification,
    successNotification,
  } = useAuthContext();

  // Redirection vers paramètre next ou page actuelle ou page d'accueil
  const redirectUrl =
    searchParams.get("next") || window.location.pathname || "/";

  const Login = (body: any) => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("email", body?.email);
    formdata.append("password", body?.password);

    return AuthService.login(formdata)
      .then((response: any) => {
        setLoading(false);
        if (response?.status === 200) {
          saveSession(response.data.token);
          saveUser(response.data.data);
          successNotification(response.data.message);
          return Promise.resolve();
        } else {
          errorNotification(response.data.message || "Erreur lors de la connexion");
          return Promise.reject();
        }
      })
      .catch((err: any) => {
        setLoading(false);
        errorNotification(
          err?.response?.data?.message ||
            err.message ||
            "Erreur de traitement"
        );
        return Promise.reject(err);
      });
  };

  return {
    loading,
    Login,
    redirectUrl,
  };
}
