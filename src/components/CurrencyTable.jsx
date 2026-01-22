import { getCurrencyFlag } from "../utils/currencyToCountry";

const CurrencyTable = ({ rates, currencies, prevRates }) => {
  return (
    <div className="overflow-auto max-h-[79vh] rounded-xl bg-white dark:bg-black ">
      <table className="w-auto text-sm border-collapse">
        <thead className="sticky top-0 bg-[#fafafa] z-20 dark:bg-black dark:border-b dark:border-gray-700">
          <tr>
            <th className="p-7 sticky left-0 bg-[#fafafa] z-30 dark:bg-[#020617]"></th>

            {currencies.map((currency) => {
              const flag = getCurrencyFlag(currency);

              return (
                <th
                  key={currency}
                  className="p-3  whitespace-nowrap text-center w-32 dark:bg-[#020617]"
                >
                  <div className="flex items-center justify-center gap-2  rounded-md py-2 px-4">
                    {flag && (
                      <span
                        className={`fi fi-${flag} flag-icon-lg rounded-full `}
                        title={currency}
                      />
                    )}
                    <span className="text-[16px] font-medium  ">
                      {currency}
                    </span>
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>

        <tbody>
          {currencies.map((base) => {
            const baseFlag = getCurrencyFlag(base);

            return (
              <tr key={base}>
                <th className="sticky left-0 bg-[#fafafa] dark:bg-[#020617]  dark:border-b dark:border-gray-700  py-4 px-4 font-medium z-20">
                  <div className="flex items-center gap-2">
                    {baseFlag && (
                      <span
                        className={`fi fi-${baseFlag} flag-icon-md rounded-full `}
                        title={base}
                      />
                    )}
                    <span className="text-[16px] ">{base}</span>
                  </div>
                </th>

                {currencies.map((quote) => {
                  const value = base === quote ? 1 : rates[quote] / rates[base];

                  const key = base + quote;
                  const prev = prevRates[key];

                  let heat = "";
                  if (value > 1.02)
                    heat = "bg-[#dcf0e6] dark:bg-black dark:text-green-500 ";
                  else if (value < 0.98)
                    heat = "bg-[#fdeaec] dark:bg-black dark:text-red-500 ";

                  let anim = "";
                  if (prev) {
                    anim =
                      value > prev
                        ? "rate-up"
                        : value < prev
                        ? "rate-down"
                        : "";
                  }

                  prevRates[key] = value;

                  return (
                    <td
                      key={quote}
                      className={`p-5 text-center tabular-nums ${heat} ${anim} border-b border-gray-200 dark:border-gray-700`}
                    >
                      {value.toFixed(4)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CurrencyTable;
