interface Props {
  postsPerPage: number;
  totalPasts: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({ postsPerPage, totalPasts, paginate, currentPage }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPasts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 mt-10 dark:bg-slate-800 text-slate-400 dark:text-white px-4 py-3 sm:px-6">
      <div className="flex-1 flex items-center justify-between">
        <p className="text-sm text-gray-700 dark:text-white">
          Affichage de <span className="font-medium">1</span> à{" "}
          <span className="font-medium">{postsPerPage}</span> sur{" "}
          <span className="font-medium">{totalPasts}</span> résultats
        </p>
        <nav className="inline-flex -space-x-px rounded-md" aria-label="Pagination">
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`mx-1 px-3 py-1.5 text-sm rounded-md border font-medium transition-all duration-200
                ${
                  number === currentPage
                    ? "bg-principal text-white border-principal shadow"
                    : "text-gray-700 border-gray-300 hover:bg-gray-100 dark:text-white dark:bg-slate-800 dark:border-gray-600"
                }`}
            >
              {number}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
