import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { saveSession, saveUser, successNotification, errorNotification } = useAuthContext();

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    effectRan.current = true;

    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const userEncoded = params.get("user");
    const next = params.get("next") || "/"; // fallback page d’accueil

    if (token && userEncoded) {
      try {
        const decodedUser = atob(userEncoded);
        const user = JSON.parse(decodedUser);

        saveSession(token);
        saveUser(user);
        successNotification("Connexion réussie via Google !");

        navigate(next);
      } catch (err) {
        errorNotification("Erreur lors du traitement de la connexion Google");
        navigate("/auth/signin");
      }
    } else {
      errorNotification("Token ou utilisateur Google manquant");
      navigate("/auth/signin");
    }
  }, [location.search, navigate, saveSession, saveUser, successNotification, errorNotification]);

  return <div>Connexion en cours via Google...</div>;
};

export default GoogleCallback;
