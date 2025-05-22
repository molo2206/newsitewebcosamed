import useAsync from "../hooks/useAsync";
import Blogia from "../components/blogs/Blogia";
import CategoryServices from "../services/CategoryServices";

const Ai4Mpox = () => {
  const { data } = useAsync(
    () => CategoryServices.getblogCat("9ef6c1d3-3d17-43bb-bd25-d3230b476ff6"),
    "9ef6c1d3-3d17-43bb-bd25-d3230b476ff6"
  );

  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen font-sans">
      {/* === Bandeau principal === */}
      <header className="relative bg-gradient-to-r from-purple-800 to-principal text-white">
        <img
          src="https://apicosamed.cosamed.org/uploads/blogs/ai4.jpg"
          alt="Bannière AI4Mpox"
          className="w-full h-[300px] object-cover opacity-60"
        />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 bg-black/60">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">AI4Mpox</h1>
          <p className="text-lg md:text-xl max-w-3xl">
            Utiliser l'IA pour renforcer la réponse à Mpox en RDC.
          </p>
        </div>
      </header>

      {/* === Contenu principal === */}
      <main className="mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-4 md:px-8 py-10">
        {/* Colonne centrale - À propos + Lien */}
        <section className="md:col-span-2 space-y-8">
          {/* À propos */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-principal mb-4">AI4Mpox</h2>
            <p className="mb-4 text-base">
              Le projet <strong>AI4Mpox</strong> vise à renforcer la réponse à
              l’épidémie de Mpox en RDC grâce à l’
              <strong>intelligence artificielle</strong>, la modélisation et des
              outils numériques.
            </p>
          </div>
        </section>

        {/* Colonne droite - Partenaires */}
        <aside className="hidden md:block md:col-span-2 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <h3 className="text-xl font-bold text-principal mb-4">Partenaires</h3>
            <div className="grid grid-cols-4 gap-8 items-center">
              {["logo.jpg", "partener2.png", "uk.png", "ai4.jpg"].map(
                (file, index) => (
                  <img
                    key={index}
                    src={`https://apicosamed.cosamed.org/uploads/parteners/${file}`}
                    alt={`Logo ${index}`}
                    className="h-18 object-contain mx-auto"
                  />
                )
              )}
            </div>
          </div>
        </aside>

        {/* === Blog en pleine largeur === */}
        <div className="col-span-2 md:col-span-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-6">
            <h2 className="text-xl font-bold text-principal mb-4">
              Actualité sur AI4Mpox
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item: any) => (
                  <Blogia key={item.id || item.slug} blog={item} />
                ))
              ) : (
                <p>Aucun article à afficher.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <div className="text-center p-4">
        <a
          href="https://ai4mpox.afiagap.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-principal text-white text-base font-medium px-6 py-3 rounded-full hover:opacity-90 transition"
        >
          En savoir plus sur AI4Mpox
        </a>
      </div>
    </div>
  );
};

export default Ai4Mpox;
