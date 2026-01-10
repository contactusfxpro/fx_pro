import { useState } from "react";
import fxLogo from "../assets/logo.png";
import ToggleTheme from "./ToggleTheme";
import {
  CircleDollarSign,
  History,
  Mail,
  Menu,
  RefreshCcw,
  RotateCcw,
  Sparkles,
  Tag,
  X,
} from "lucide-react";
import ContactModal from "./ContactModal";
import { Link, NavLink } from "react-router-dom";
import { Home, Coins, BarChart3 } from "lucide-react";

const Navbar = () => {
  const [open1, setOpen1] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <div className="flex items-center gap-2 ">
            <Menu
              onClick={() => setMenuOpen(true)}
              className="dark:text-[#fafafa] block lg:hidden cursor-pointer"
            />

            <Link to="/" className="flex items-center gap-3">
              <img
                src={fxLogo}
                alt="CrossCurrencyFX logo"
                className="h-12 w-14 rounded-md"
              />
              <div className="hidden md:flex flex-col leading-tight">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  CrossCurrencyFX
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Global Fx, Simplified
                </p>
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2  items-center gap-6 ">
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
                    <span>Currency List</span>
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
            <NavLink to="/pricing" className={navItem}>
              {({ isActive }) => (
                <>
                  <div
                    className={`flex items-center gap-1 text-[16px] transition-all
      ${isActive ? "font-semibold " : "font-medium"}
    `}
                  >
                    <Tag className="w-4 h-4" />
                    <span>Pricing</span>
                  </div>

                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 w-full rounded-full transition-all
        ${isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-transparent"}`}
                  />
                </>
              )}
            </NavLink>

            <NavLink
              to="/currencyconverter"
              className="gradientexport   text-white px-2 p-1 rounded-2xl "
            >
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
                </>
              )}
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setOpen1(true)}
              className="rounded-lg gradient text-white px-4 py-2 cursor-pointer text-sm font-semibold flex items-center gap-2"
            >
              <Mail className="w-5 h-5 block  lg:hidden" />
              <Sparkles className="w-4 h-4 hidden lg:flex" />
              <p className="hidden lg:flex">Get in touch</p>
            </button>
            <ToggleTheme />
          </div>
        </div>

        {/* MOBILE FULL CANVAS MENU */}

        {menuOpen && (
          <div
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity lg:hidden"
          />
        )}
        <div
          className={`fixed inset-0 z-40 bg-[#fafafa] dark:bg-[#070d17] w-[80%] md:w-[75%]
  transform transition-transform duration-300 ease-in-out
  ${menuOpen ? "translate-x-0" : "-translate-x-full"}
  lg:hidden`}
        >
          {/* Header */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Menu
            </p>
            <button
              onClick={() => setMenuOpen(false)}
              className="dark:text-[#fafafa] rounded-full dark:bg-black text-gray-600 cursor-pointer bg-gray-300 p-1"
            >
              <X />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex flex-col px-6 py-6 gap-6">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className={navItem}
            >
              <div className="flex items-center gap-3 text-lg">
                <Home className="w-5 h-5" />
                Home
              </div>
            </NavLink>

            <NavLink
              to="/currencies"
              onClick={() => setMenuOpen(false)}
              className={navItem}
            >
              <div className="flex items-center gap-3 text-lg">
                <CircleDollarSign className="w-5 h-5" />
                Currency List
              </div>
            </NavLink>

            <NavLink
              to="/history"
              onClick={() => setMenuOpen(false)}
              className={navItem}
            >
              <div className="flex items-center gap-3 text-lg">
                <History className="w-5 h-5" />
                Historical Data
              </div>
            </NavLink>

            <NavLink
              to="/pricing"
              onClick={() => setMenuOpen(false)}
              className={navItem}
            >
              <div className="flex items-center gap-3 text-lg">
                <Tag className="w-5 h-5" />
                Pricing
              </div>
            </NavLink>

            <NavLink
              to="/currencyconverter"
              onClick={() => setMenuOpen(false)}
              className="gradientexport text-white px-4 py-3 rounded-xl text-lg font-semibold"
            >
              <div className="flex items-center gap-3">
                <RefreshCcw className="w-5 h-5" />
                Currency Converter
              </div>
            </NavLink>
          </div>
        </div>
      </nav>

      <ContactModal open={open1} onClose={() => setOpen1(false)} />
    </>
  );
};

export default Navbar;
