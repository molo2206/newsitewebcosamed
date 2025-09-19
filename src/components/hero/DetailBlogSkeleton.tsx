const DetailBlogSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6 animate-pulse">
      {/* Breadcrumb */}
      <div className="h-6 bg-gray-300 rounded w-1/4"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contenu principal */}
        <article className="lg:col-span-8 space-y-6">
          {/* Titre */}
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>

          {/* Catégorie */}
          <div className="h-5 bg-gray-200 rounded w-1/4"></div>

          {/* Image */}
          <div className="w-full h-60 bg-gray-300 rounded"></div>

          {/* Contenu texte */}
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          ))}

          {/* Auteur */}
          <div className="flex items-center gap-4 border-t pt-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="space-y-1">
              <div className="h-3 bg-gray-300 rounded w-32"></div>
              <div className="h-2 bg-gray-200 rounded w-20"></div>
            </div>
          </div>

          {/* Likes */}
          <div className="h-10 bg-gray-200 rounded w-48 mt-4"></div>

          {/* Zone commentaires */}
          <div className="space-y-4 mt-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 bg-gray-200 dark:bg-gray-700 p-3 rounded-xl">
                <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                <div className="flex-1 space-y-1">
                  <div className="h-3 bg-gray-300 rounded w-24"></div>
                  <div className="h-2 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 h-40 rounded-md"></div>
          ))}
        </aside>
      </div>

      {/* Partage social */}
      <div className="flex gap-3 mt-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="w-8 h-8 bg-gray-300 rounded-full"></div>
        ))}
      </div>
    </div>
  );
};

export default DetailBlogSkeleton;
