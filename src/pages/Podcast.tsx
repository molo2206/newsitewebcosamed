import { useEffect, useState } from "react";
import PodcastSkeleton from "../components/blogs/PodcastSkeleton";
import PodcastCard from "../components/cards/PodcastCard";


const Podcasts = () => {
  const [allPodcasts, setAllPodcasts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const postsPerPage = 8;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPodcasts = allPodcasts.slice(indexOfFirstPost, indexOfLastPost);

  const PODBEAN_RSS = "https://MEDIA_COSAMED_SANTE.podbean.com/feed.xml";

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchPodcasts = async () => {
      setLoading(true);
      try {
        const CORS_PROXY = "https://api.allorigins.win/get?url=";
        const response = await fetch(
          `${CORS_PROXY}${encodeURIComponent(PODBEAN_RSS)}`
        );
        const data = await response.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data.contents, "text/xml");
        const items = Array.from(xmlDoc.getElementsByTagName("item"));

        const episodes = items.map((item) => ({
          title: item.getElementsByTagName("title")[0]?.textContent || "",
          description:
            item.getElementsByTagName("description")[0]?.textContent || "",
          soundcloudUrl:
            item.getElementsByTagName("enclosure")[0]?.getAttribute("url") ||
            "",
          date: item.getElementsByTagName("pubDate")[0]?.textContent || "",
          author: xmlDoc.getElementsByTagName("title")[0]?.textContent || "",
        }));

        setAllPodcasts(episodes);
      } catch (err) {
        console.error("Erreur fetch RSS:", err);
        setAllPodcasts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 dark:text-white min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Fil d’Ariane */}
        <div className="mb-8 text-gray-900 dark:text-white font-semibold">
          Podcasts
        </div>

        {/* Titre section */}
        <section className="mb-8 bg-principal dark:bg-slate-800 text-white text-center rounded-md p-6 shadow-md transition-colors duration-300">
          <h1 className="text-[16px] font-bold uppercase tracking-widest">
            Nos Podcasts
          </h1>
        </section>

        {/* Liste podcasts */}
        <section className="mb-10 mt-6">
          {loading || allPodcasts.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <PodcastSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentPodcasts.map((podcast, idx) => (
                  <PodcastCard podcast={podcast} key={idx} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex justify-center space-x-2">
                {Array.from({
                  length: Math.ceil(allPodcasts.length / postsPerPage),
                }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? "bg-principal text-white"
                        : "bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Podcasts;
