import { usePresenceSocket } from "../../hooks/usePresenceSocket";
import dayjs from "dayjs";

export default function PresenceNotifier() {
  const { latestPresence } = usePresenceSocket();

  return (
    <div className="p-6 bg-gray-100 dark:bg-slate-900 min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col items-center w-full">
        {/* Banner */}
        <div className="w-full">
          <img
            src="https://apicosamed.cosamed.org/uploads/blogs/505259756244493872b7709a8a01b536.png"
            alt="Présence Banner"
            className="w-full object-cover h-64 rounded-md"
          />
        </div>

        {/* Presence card */}
        <div className="w-full max-w-md mt-[-4rem] bg-white dark:bg-slate-800 shadow-md rounded-md p-6 space-y-4">
          <h2 className="text-center text-lg font-semibold mb-4">
            Notifications de présence
          </h2>

          {latestPresence ? (
            <div className="space-y-3">
              <div className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 p-4 rounded-md">
                <strong>Présence enregistrée !</strong>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-slate-700 rounded-md shadow-sm space-y-1">
                <p>
                  <strong>Étudiant :</strong> {latestPresence.student.fullName} (
                  {latestPresence.student.matricule})
                </p>
                <p>
                  <strong>Examen :</strong> {latestPresence.exam.name}
                </p>
                <p>
                  <strong>Date & Heure :</strong>{" "}
                  {dayjs(latestPresence.timestamp).format("DD/MM/YYYY HH:mm:ss")}
                </p>
                <p>
                  <strong>Promotion :</strong> {latestPresence.student.promotionId}
                </p>
                <p>
                  <strong>Recess :</strong> {latestPresence.student.recessId || "—"}
                </p>
                <p>
                  <strong>Numéro de téléphone :</strong>{" "}
                  {latestPresence.student.phone || "—"}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-300">
              Aucune présence récente
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
