import { useState } from "react";
import fxLogo from "../assets/logo.png";
import ToggleTheme from "./ToggleTheme";
import { SpaceIcon, Sparkles } from "lucide-react";
import ContactModal from "./ContactModal";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#fafafa] dark:bg-[#070d17] dark:border-b dark:border-gray-700 ">
        <div className=" px-6">
          <div className="flex h-16 items-center justify-between">
            <Link to={"/"} className="flex items-center gap-3">
              <img
                src={fxLogo}
                alt="Fx Pro logo"
                className="h-15 w-16 rounded-md"
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

            <div className="flex items-center gap-6">
              <Link
                to={"/history"}
                className=" cursor-pointer text-blue-600 font-semibold flex items-center gap-2 hover:underline"
              >
                Historical Cross Rates
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="rounded-lg gradient cursor-pointer text-white px-4 py-2 text-sm font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Get in touch
              </button>
              <ToggleTheme />
            </div>
          </div>
        </div>
      </nav>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
