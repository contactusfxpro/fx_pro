import React from "react";
import { getCurrencyFlag } from "../utils/currencyToCountry";

const AMOUNTS = [1000, 2000, 4000, 6000, 8000, 10000];

const ConversionTable = ({ from, to, rates }) => {
  if (!rates[from] || !rates[to]) return null;

  const rate = rates[to] / rates[from];
  const fromFlag = getCurrencyFlag(from);
  const toFlag = getCurrencyFlag(to);

  return (
    <div className="bg-white dark:bg-[#020617] dark:text-[#fafafa] rounded-xl border border-gray-300 dark:border-gray-700 text-gray-700 overflow-hidden">
      <table className="w-full text-sm text-center border-collapse">
        <thead className="border-b border-gray-300 dark:border-gray-700 dark:text-[#fafafa] bg-gray-100 dark:bg-[#0f172a] ">
          <tr className="font-medium ">
            <th className="py-3 ">
              <div className="flex items-center justify-center gap-2">
                {fromFlag && <span className={`fi fi-${fromFlag}`} />}
                {from}
              </div>
            </th>

            <th className="py-3">
              <div className="flex items-center justify-center gap-2">
                {toFlag && <span className={`fi fi-${toFlag}`} />}
                {to}
              </div>
            </th>
          </tr>
        </thead>

        <tbody>
          {AMOUNTS.map((amount) => (
            <tr
              key={amount}
              className="border-t border-gray-200 dark:border-gray-700"
            >
              <td className="py-3 font-medium">
                {amount.toLocaleString()} {from}
              </td>

              <td className="py-3">
                {(amount * rate).toFixed(2)} {to}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConversionTable;
