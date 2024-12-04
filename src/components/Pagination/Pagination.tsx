interface props {
  postsPerPage?: any;
  totalPasts?: any;
  paginate?: any;
}

const Pagination = ({ postsPerPage, totalPasts, paginate }: props) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPasts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="flex items-center justify-between border-t border-gray-200 mt-10 dark:bg-slate-800  text-slate-400 dark:text-white px-4 py-3 sm:px-6">
      <div className="sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700  dark:text-white ">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">{totalPasts}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {pageNumbers.map((number) => (
              <ul>
                <li key={number}>
                  <a
                    onClick={() => paginate(number)}
                    
                    aria-current="page"
                    className="cursor-pointer relative z-10 inline-flex items-center bg-principal px-4 py-2 text-sm font-semibold
                     text-white focus:z-20 focus-visible:outline focus-visible:outline-2 
                     focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-slate-800 border rounded-lg"
                  >
                    {number}
                  </a>
                </li>
              </ul>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
