import React, { useMemo, useState } from "react";
import { currencies } from "../utils/currencies";
import { getCurrencyFlag } from "../utils/currencyToCountry";
import { ArrowRightLeft, ArrowUpDown } from "lucide-react";

const trackEvent = (name, params = {}) => {
  if (window.gtag) {
    window.gtag("event", name, params);
  }
};

const ConverterCard = ({ rates, from, to, setFrom, setTo }) => {
  const [amount, setAmount] = useState(1);

  const handleSwap = () => {
    trackEvent("currency_swap_clicked", {
      from_currency: from,
      to_currency: to,
    });

    setFrom(to);
    setTo(from);
  };

  const converted = useMemo(() => {
    if (!rates[from] || !rates[to]) return 0;
    return (amount / rates[from]) * rates[to];
  }, [amount, from, to, rates]);

  return (
    <div className="w-full bg-white border border-gray-300 dark:border-gray-700 dark:bg-[#020617] rounded-2xl p-6">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Currency Converter
      </h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);

          trackEvent("currency_amount_entered", {
            amount: e.target.value,
            from_currency: from,
            to_currency: to,
          });
        }}
        className="w-full p-4 mb-6  rounded-xl dark:bg-[#0f172a] bg-[#f5f5f7] outline-none focus:ring-1 focus:ring-blue-500"
      />

     <div className="flex flex-col md:grid md:grid-cols-[minmax(0,1fr)_48px_minmax(0,1fr)] items-center gap-4 mb-6 w-full">

        <div className="flex items-center gap-3 rounded-xl p-3 bg-[#f5f5f7] dark:bg-[#0f172a] w-full">
  {getCurrencyFlag(from) && (
    <span className={`fi fi-${getCurrencyFlag(from)} flag-icon-lg shrink-0`} />
  )}
  <select
    value={from}
    onChange={(e) => setFrom(e.target.value)}
    className="bg-transparent w-full outline-none text-sm md:text-base"
  >
    {currencies.map((c) => (
      <option
        key={c.code}
        value={c.code}
        className="dark:bg-[#020617]"
      >
        {c.code} — {c.name}
      </option>
    ))}
  </select>
</div>


       <button
  onClick={handleSwap}
  className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:rotate-180 transition-transform duration-300"
  title="Swap currencies"
>
  <ArrowUpDown size={18} className="md:hidden" />
  <ArrowRightLeft size={20} className="hidden md:block" />
</button>


        <div className="flex items-center gap-3 rounded-xl p-3 bg-[#f5f5f7] dark:bg-[#0f172a] w-full">
  {getCurrencyFlag(to) && (
    <span className={`fi fi-${getCurrencyFlag(to)} flag-icon-lg shrink-0`} />
  )}
  <select
    value={to}
    onChange={(e) => setTo(e.target.value)}
    className="bg-transparent w-full outline-none text-sm md:text-base"
  >
    {currencies.map((c) => (
      <option
        key={c.code}
        value={c.code}
        className="dark:bg-[#020617]"
      >
        {c.code} — {c.name}
      </option>
    ))}
  </select>
</div>

      </div>

      <div className="text-center text-xl w-full p-4 mb-6  bg-[#f5f5f7]  rounded-xl dark:bg-[#0f172a]">
        <span className="text-sm">
          {amount} {from}
        </span>
        <span className="mx-2 text-sm">equals</span>
        <br />
        <span className="font-bold text-2xl mt-1">
          {converted.toFixed(2)} {to}
        </span>
      </div>
    </div>
  );
};

export default ConverterCard;
