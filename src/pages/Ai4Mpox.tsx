import useAsync from "../hooks/useAsync";
import Blogia from "../components/blogs/Blogia";
import CategoryServices from "../services/CategoryServices";
import BreadCumb from "../components/navbar/BreadCumb";

const Ai4Mpox = () => {
  const { data = [] } = useAsync(
    () => CategoryServices.getblogCat("9ef6c1d3-3d17-43bb-bd25-d3230b476ff6"),
    "9ef6c1d3-3d17-43bb-bd25-d3230b476ff6"
  );

  return (
    <div className="lg:container mx-auto w-full dark:text-white mt-6  p-4">
       <BreadCumb title="AI4Mpox" />
      <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen font-sans">
       
        <header className="relative bg-gradient-to-r from-purple-800 to-principal text-white">
          <img
            src="https://apicosamed.cosamed.org/uploads/blogs/ai4.jpg"
            alt="Bannière AI4Mpox"
            className="w-full h-[300px] object-cover opacity-60"
            loading="lazy"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-12 lg:px-24 bg-black/60">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
              AI4Mpox
            </h1>
            <p className="text-lg md:text-xl max-w-3xl">
              Utiliser l'IA pour renforcer la réponse à Mpox en RDC.
            </p>
          </div>
        </header>

        <main className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 md:px-8 py-12">
          {/* Texte principal - AI4Mpox */}
          <section className="md:col-span-2 space-y-8 order-1 md:order-1">
            <article className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-principal mb-6">
                AI4Mpox
              </h2>
              <p className="text-base leading-relaxed">
                Le projet <strong>AI4Mpox</strong> vise à renforcer la réponse à
                l’épidémie de Mpox en RDC grâce à l’
                <strong>intelligence artificielle</strong>, la modélisation et
                des outils numériques.
              </p>
            </article>
          </section>

          {/* Partenaires */}
          <aside className="md:col-span-2 space-y-6 order-2 md:order-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-xl font-bold text-principal mb-6">
                Partenaires
              </h3>
              <div className="grid grid-cols-4 gap-8 items-center">
                {["logo.jpg", "partener2.png", "uk.png", "ai4.jpg"].map(
                  (file, index) => (
                    <img
                      key={index}
                      src={`https://apicosamed.cosamed.org/uploads/parteners/${file}`}
                      alt={`Logo partenaire ${index + 1}`}
                      className="h-18 object-contain mx-auto"
                      loading="lazy"
                    />
                  )
                )}
              </div>
            </div>
          </aside>

          {/* Actualités */}
          <section className="col-span-1 md:col-span-4 order-3 md:order-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8">
              <h2 className="text-2xl font-bold text-principal mb-6">
                Actualités sur AI4Mpox
              </h2>
              {data.length > 0 ? (
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
                  {data.map((item: any) => (
                    <Blogia key={item.id || item.slug} blog={item} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-400">
                  Aucun article à afficher.
                </p>
              )}
            </div>
          </section>
        </main>

        <footer className="text-center p-8 bg-white dark:bg-gray-800">
          <a
            href="https://ai4mpox.afiagap.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-principal text-white text-lg font-semibold px-8 py-3 rounded-full hover:opacity-90 transition"
          >
            En savoir plus sur AI4Mpox
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Ai4Mpox;
