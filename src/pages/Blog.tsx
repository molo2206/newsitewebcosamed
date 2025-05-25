import useAsync from "../hooks/useAsync";
import BlogServices from "../services/BlogsServices";
import BlogCard from "../components/blogs/BlogCard";
import BlogCardLoand from "../components/blogs/BlogCardLoad";

export default function Blog() {
  const { data, loading } = useAsync(() => BlogServices.getBlog());
  return (
    <div className=" mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">Publications</h1>
      <p className="text-gray-600 mb-6">
        If you cannot find a publication on our website, please search WHO's
        publications repository directly.
      </p>

      <div className="bg-gray-100 p-6 rounded-lg mb-12">
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
          <input
            type="text"
            placeholder="Countries/Areas"
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
          <input
            type="text"
            placeholder="Publishing Offices"
            className="p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {loading
          ? Array.from({ length: 20 }).map((_, i) => <BlogCardLoand key={i} />)
          : data?.map((item: any, index: number) => (
              <BlogCard blog={item} key={index} />
            ))}
      </div>
    </div>
  );
}
