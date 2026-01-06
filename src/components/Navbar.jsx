import { useState } from "react";
import fxLogo from "../assets/fx.svg";
import ToggleTheme from "./ToggleTheme";
import { SpaceIcon, Sparkles } from "lucide-react";
import ContactModal from "./ContactModal";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="sticky top-0 z-50 bg-[#fafafa] dark:bg-[#070d17] dark:border-b dark:border-gray-700 ">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={fxLogo}
                alt="Fx Pro logo"
                className="h-9 w-9 rounded-md"
              />

              <div className="flex flex-col leading-tight">
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Fx_Pro
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Cross Currency Rates
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <ToggleTheme />
              <button
                onClick={() => setOpen(true)}
                className="rounded-lg gradient cursor-pointer text-white px-4 py-2 text-sm font-semibold flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                Get in touch
              </button>
            </div>
          </div>
        </div>
      </nav>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
