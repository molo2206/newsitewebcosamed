import React, { useEffect, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import AuthService from "../../services/AuthService";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: () => void;
}

export default function LoginPopup({
  isOpen,
  onClose,
  onContinue,
}: LoginPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      popupRef.current?.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;
  const handleGoogleContinue = () => {
    AuthService.loginWithGoogle(); // redirige vers OAuth Google
  };
  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenu popup */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-popup-title"
        tabIndex={-1}
        ref={popupRef}
        className="fixed inset-0 flex items-center justify-center z-50 px-4 outline-none"
      >
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700  shadow-xl max-w-md w-full p-6 sm:p-8 relative animate-fade-in">
          {/* Bouton fermeture */}
          <button
            onClick={onClose}
            aria-label="Fermer"
            className="absolute top-4 right-4 text-gray-400 hover:text-principal dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-principal rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Icône utilisateur */}
          <div className="flex justify-center mb-5">
            <FaUserCircle className="text-principal dark:text-white w-10 h-10" />
          </div>

          {/* Titre */}
          <h2
            id="login-popup-title"
            className="text-center text-[22px] font-bold text-gray-900 dark:text-white mb-1"
          >
            Se connecter à COSAMED
          </h2>

          {/* Description */}
          <p className="text-center text-gray-600 dark:text-gray-400 text-sm mb-6">
            Connectez-vous pour interagir et accéder aux fonctionnalités.
          </p>

          {/* Boutons */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={handleGoogleContinue}
              className="w-full inline-flex items-center justify-center gap-3 bg-principal hover:bg-hover text-white text-sm font-semibold px-6 py-3 rounded-md shadow-sm transition focus:outline-none focus:ring-2 focus:ring-principal"
            >
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google icon"
                className="w-5 h-5"
                loading="lazy"
              />
              Continuer avec Google
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full text-center text-sm text-gray-500 dark:text-gray-400 hover:text-principal dark:hover:text-white transition font-medium"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
