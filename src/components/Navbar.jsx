import { useState } from "react";
import fxLogo from "../assets/logo.png";
import ToggleTheme from "./ToggleTheme";
import {
  CircleDollarSign,
  History,
  RefreshCcw,
  RotateCcw,
  Sparkles,
} from "lucide-react";
import ContactModal from "./ContactModal";
import { Link, NavLink } from "react-router-dom";
import { Home, Coins, BarChart3 } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItem = ({ isActive }) =>
    `relative text-sm font-semibold transition-colors
   ${
     isActive
       ? "text-blue-600 dark:text-blue-400"
       : "text-gray-700 dark:text-gray-300 hover:text-blue-600"
   }`;

  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#fafafa] dark:bg-[#070d17] border-b border-gray-300 dark:border-gray-700">
        <div className="relative h-16 px-6 flex items-center justify-between">
          {/* LEFT — Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={fxLogo}
              alt="CrossCurrencyFX logo"
              className="h-12 w-14 rounded-md"
            />
            <div className="flex flex-col leading-tight">
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                CrossCurrencyFX
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Global FX Cross-Rate Analytics
              </p>
            </div>
          </Link>

          {/* CENTER — Nav Items */}
          <div className="absolute left-1/2 -translate-x-1/2 flex gap-8 ">
            <NavLink to="/" className={navItem}>
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center gap-1 text-[16px] transition-all
      ${isActive ? "font-semibold " : "font-medium"}
    `}
                  >
                    <Home className="w-4 h-4" />
                    <span>Home</span>
                  </div>
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full transition-all
        ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}
                  />
                </>
              )}
            </NavLink>

            <NavLink to="/currencies" className={navItem}>
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center gap-1 text-[16px] transition-all
      ${isActive ? "font-semibold " : "font-medium"}
    `}
                  >
                    <CircleDollarSign className="w-4 h-4" />
                    <span>Currencies</span>
                  </div>

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full transition-all
        ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}
                  />
                </>
              )}
            </NavLink>

            <NavLink to="/history" className={navItem}>
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center gap-1 text-[16px] transition-all
      ${isActive ? "font-semibold " : "font-medium"}
    `}
                  >
                    <History className="w-4 h-4" />
                    <span>Historical Data</span>
                  </div>

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full transition-all
        ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}
                  />
                </>
              )}
            </NavLink>

            <NavLink to="/currencyconverter" className={navItem}>
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center gap-1 text-[16px] transition-all
      ${isActive ? "font-semibold " : "font-medium"}
    `}
                  >
                    <RefreshCcw className="w-4 h-4" />
                    <span>Currency Converter</span>
                  </div>

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full transition-all
        ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}
                  />
                </>
              )}
            </NavLink>
          </div>

          {/* RIGHT — Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen(true)}
              className="rounded-lg gradient text-white px-4 py-2 cursor-pointer text-sm font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Get in touch
            </button>
            <ToggleTheme />
          </div>
        </div>
      </nav>

      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
