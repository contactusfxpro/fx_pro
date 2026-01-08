import { Copyright } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <>
      <div className="w-full h-10.5 bg-[#fafafa] dark:bg-[#070d17] dark:border-gray-700 border-t border-gray-300 flex items-center justify-center">
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
          <Copyright className="w-3 h-3" /> {new Date().getFullYear()}{" "}
          CrossCurrencyFX. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
