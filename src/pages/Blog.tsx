import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import BlogCard from "../components/blogs/BlogCard";
import BlogCardLoand from "../components/blogs/BlogCardLoad";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";
export default function Blog() {
  const { data, loading } = useAsync(() => BlogServices.getBlog());

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentBlog = data.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: any) => setCurrentPage(pageNumber);

  return (
    <div className=" mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Publications</h1>
      <p className="text-gray-600 mb-6">
        If you cannot find a publication on our website, please search COSAMED's
        publications repository directly.
      </p>

      <div className="bg-gray-100 p-6 dark:bg-slate-800 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Search by keyword"
            className="p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Health Topic"
            className="p-2 border rounded"
          />

          <select className="p-2 border rounded">
            <option>2022</option>
            <option>2023</option>
            <option>2024</option>
            <option>2025</option>
          </select>
          <select className="p-2 border rounded">
            <option>Publication type</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => <BlogCardLoand key={i} />)
          : currentBlog?.map((item: any, index: number) => (
              <BlogCard blog={item} key={index} />
            ))}
      </div>
      <Pagination
        postsPerPage={postsPerPage}
        totalPasts={data.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
