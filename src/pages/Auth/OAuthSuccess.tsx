import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const {
    saveSession,
    saveUser,
    successNotification,
    errorNotification,
  } = useAuthContext();

  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return; // Évite double exécution en React Strict Mode
    effectRan.current = true;

    try {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const userEncoded = params.get("user");

      if (!token || !userEncoded) {
        setError("Données d'authentification manquantes.");
        return;
      }

      const user = JSON.parse(atob(userEncoded));

      saveSession(token);
      saveUser(user);
      successNotification("Connexion réussie via OAuth !");

      setTimeout(() => {
        if (window.history.length > 2) {
          navigate(-1); // Retour à la page précédente si possible
        } else {
          navigate("/"); // Sinon vers la page d’accueil (à personnaliser)
        }
      }, 2000);
    } catch (err) {
      console.error("Erreur OAuth:", err);
      errorNotification("Erreur lors de la connexion OAuth.");
      setError("Erreur lors de la connexion OAuth.");
    }
  }, [navigate, saveSession, saveUser, successNotification, errorNotification]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-100 text-red-800 font-medium">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-900 text-center p-6">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-principal mb-6"></div>
      <h1 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
        Connexion réussie
      </h1>
      <p className="text-gray-500 dark:text-gray-300">
        Redirection vers votre espace personnel...
      </p>
    </div>
  );
};

export default OAuthSuccess;
