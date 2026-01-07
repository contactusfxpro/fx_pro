import React from "react";
import { currencies } from "../utils/currencies";
import CurrencyTableISO from "../components/CurrencyTableISO";

const Currencies = () => {
  return (
    <div className="max-w-6xl mx-auto py-5 dark:text-[#fafafa]">
      <CurrencyTableISO data={currencies} />
    </div>
  );
};

export default Currencies;
