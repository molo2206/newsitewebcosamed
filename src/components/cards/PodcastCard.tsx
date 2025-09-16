
interface Podcast {
  title: string;
  description?: string;
  image?: string;
  audioUrl?: string; // ✅ pour Podbean RSS
  author?: string;
  date?: string;
}

const PodcastCard = ({ podcast }: { podcast: Podcast }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-md shadow-md overflow-hidden transition hover:shadow-lg duration-300">
      {/* Image */}
      {podcast.image && (
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4 flex flex-col space-y-2">
        {/* Titre */}
        <h3 className="font-semibold text-md text-gray-900 dark:text-white line-clamp-2">
          {podcast.title}
        </h3>

        {/* Description */}
        {podcast.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
            {podcast.description}
          </p>
        )}

        {/* Lecteur audio Podbean */}
        {podcast.audioUrl && (
          <div className="mt-2">
            <audio controls className="w-full">
              <source src={podcast.audioUrl} type="audio/mpeg" />
              Votre navigateur ne supporte pas l’élément audio.
            </audio>
          </div>
        )}

        {/* Auteur + Date */}
        {(podcast.author || podcast.date) && (
          <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
            {podcast.author} {podcast.date && `- ${podcast.date}`}
          </p>
        )}
      </div>
    </div>
  );
};

export default PodcastCard;
