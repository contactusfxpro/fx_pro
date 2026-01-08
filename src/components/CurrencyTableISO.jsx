import React, { useState, useMemo } from "react";
import { getCurrencyFlag } from "../utils/currencyToCountry";
import { Search } from "lucide-react";

const CurrencyTableISO = ({ data }) => {
  const [search, setSearch] = useState("");

  const filteredData = useMemo(() => {
    return data.filter(
      (item) =>
        item.code.toLowerCase().includes(search.toLowerCase()) ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.country.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  return (
    <div className="w-full">
      <div className="md:flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-700 dark:text-[#fafafa] mb-2 lg:mb-0">
          ISO 4217 Currency Codes
        </h1>

        <div className="relative">
          <input
            type="text"
            placeholder="Search currency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 px-7 py-2 text-sm rounded-lg border border-gray-300 
                     dark:border-gray-700 dark:bg-[#020617] 
                     focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <Search className="absolute top-2.5 ml-2 left-0 text-gray-400 w-4.5 h-4.5" />
        </div>
      </div>

      <div
        className="overflow-y-auto rounded-lg border border-gray-300 dark:border-gray-700"
        style={{
          height: "calc(100vh - 64px - 80px - 64px)",
        }}
      >
        <table className="min-w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-gray-200 dark:bg-[#0f172a]">
            <tr>
              <th className="px-8 py-3 text-left text-sm font-semibold">
                Flag
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Currency Code
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Currency Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-semibold">
                Country
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredData.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-4 py-6 text-center text-sm text-gray-500"
                >
                  No results found
                </td>
              </tr>
            )}

            {filteredData.map((item) => (
              <tr
                key={item.code}
                className="border-t border-gray-200 dark:border-gray-700 
                           hover:bg-gray-50 dark:hover:bg-[#020617] dark:text-[#fafafa]"
              >
                <td className="px-8 py-2">
                  <div className="flex items-center gap-2">
                    {getCurrencyFlag(item.code) && (
                      <span
                        className={`fi fi-${getCurrencyFlag(
                          item.code
                        )} flag-icon-md rounded-full`}
                        title={item.country}
                      />
                    )}
                  </div>
                </td>

                <td className="px-4 py-2  font-semibold text-blue-600 dark:text-blue-400">
                  {item.code}
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyTableISO;
