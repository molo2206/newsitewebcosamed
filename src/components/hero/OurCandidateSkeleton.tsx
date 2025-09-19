import { useState } from "react";

const OurCandidateSkeleton = () => {
  const [currentTab] = useState(1);

  const tabs = [
    { id: 1, title: "Actives" },
    { id: 2, title: "Inactives" },
  ];

  return (
    <div className=" bg-gray-100 dark:bg-slate-900 animate-pulse">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Titre et description */}
        <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>

        {/* Tabs */}
        <div className="flex border-b mb-4 space-x-2">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`h-10 w-32 rounded ${
                currentTab === tab.id ? "bg-gray-400" : "bg-gray-200"
              }`}
            ></div>
          ))}
        </div>

        {/* Tableau */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 p-3 h-6"></th>
                <th className="border border-gray-200 p-3 h-6"></th>
                <th className="border border-gray-200 p-3 h-6"></th>
                <th className="border border-gray-200 p-3 h-6"></th>
                <th className="border border-gray-200 p-3 h-6"></th>
              </tr>
            </thead>
            <tbody>
              {Array.from(Array(3).keys()).map((i) => (
                <tr key={i} className="bg-gray-50">
                  <td className="border border-gray-200 p-3 h-6"></td>
                  <td className="border border-gray-200 p-3 h-6"></td>
                  <td className="border border-gray-200 p-3 h-6"></td>
                  <td className="border border-gray-200 p-3 h-6"></td>
                  <td className="border border-gray-200 p-3 h-6"></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mon compte */}
        <div className="mt-10 mx-auto bg-white p-6 rounded-lg shadow-md dark:bg-slate-800">
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-6"></div>
          <div className="h-10 bg-gray-300 rounded w-40"></div>
        </div>

        {/* Panneaux coulissants */}
        <div className="fixed top-0 right-0 h-full md:w-[700px] w-full bg-white shadow-lg border-l border-gray-300 transform translate-x-full">
          <div className="p-6 h-full overflow-y-scroll space-y-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-4 bg-gray-300 rounded w-full"></div>
            <div className="h-40 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCandidateSkeleton;
