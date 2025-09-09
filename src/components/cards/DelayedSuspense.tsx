import { Suspense, useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { FaSpinner } from "react-icons/fa";

const DelayedSuspense: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [ready, setReady] = useState(false);
  const [isDark, setIsDark] = useState(false);
  console.log(isDark);

  useEffect(() => {
    // Détecte dark mode
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    setIsDark(document.documentElement.classList.contains("dark"));

    // Simule un délai de 5 secondes
    const timer = setTimeout(() => setReady(true), 5000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, []);

  if (!ready) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
        {/* Spinner animé */}
        <FaSpinner className="text-5xl text-gray-700 dark:text-gray-200 animate-spin mb-6" />
        <span className="mt-6 text-gray-700 dark:text-gray-200 font-semibold text-lg animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default DelayedSuspense;
