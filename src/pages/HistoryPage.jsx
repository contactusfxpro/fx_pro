import React from "react";
import commingsoon from "../assets/commingsoon1.svg";
import commingsoon2 from "../assets/commingsoon2.svg";

import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const HistoryPage = () => {
  return (
    <div
      className="
        flex flex-col items-center justify-center
        min-h-[calc(100vh-110px)]
        dark:text-[#fafafa]
      "
    >
      <img src={commingsoon} alt="" className="w-110  hidden dark:block" />
      <img src={commingsoon2} alt="" className="w-110  block dark:hidden" />


      <div className="text-center mt-4">
        <p className="font-bold text-4xl text-gray-700 dark:text-[#fafafa]">Coming Soon ...</p>
        <p className="text-gray-700 dark:text-gray-300 mt-4 max-w-lg mx-auto">
          This upcoming feature will help you analyze historical cross-currency
          rates and understand how markets have moved over time.
        </p>
      </div>

      <Link
        to="/"
        className="rounded-lg mt-6 gradient text-white px-4 py-2 text-sm font-semibold flex items-center gap-2"
      >
        <Home className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  );
};

export default HistoryPage;
