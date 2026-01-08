import { useEffect, useRef, useState } from "react";

export default function SearchableDropdown({
  options,
  value,
  onChange,
  placeholder = "Select option...",
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [highlighted, setHighlighted] = useState(0);
  const ref = useRef(null);

  const filtered = options.filter((opt) =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const onKeyDown = (e) => {
    if (!open) return;

    if (e.key === "ArrowDown") {
      setHighlighted((h) => (h + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      setHighlighted((h) => (h - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      onChange(filtered[highlighted]);
      setOpen(false);
      setSearch("");
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className="relative w-34" onKeyDown={onKeyDown}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-slate-300 bg-white dark:bg-black dark:border-gray-700 dark:text-[#f4f4f4] px-3 py-2 text-sm focus:outline-none "
      >
        <span className={value ? "text-slate-900 dark:text-[#f4f4f4]" : "text-slate-400"}>
          {value || placeholder}
        </span>
        <svg
          className="h-4 w-4 text-slate-500 dark:text-[#f4f4f4]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 mt-2 w-full rounded-lg border border-slate-200 bg-white dark:bg-black dark:border-gray-700 shadow-lg">
          <input
            autoFocus
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setHighlighted(0);
            }}
            placeholder="Search..."
            className="w-full border-b border-slate-200 dark:border-gray-700 px-3 py-2 text-sm focus:outline-none"
          />

          <ul className="max-h-48 overflow-auto">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-slate-400">No results</li>
            )}

            {filtered.map((opt, i) => (
              <li
                key={`${opt}-${i}`}
                onMouseEnter={() => setHighlighted(i)}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                  setSearch("");
                }}
                className={`cursor-pointer px-3 py-2 text-sm ${
                  i === highlighted
                    ? "bg-blue-500 text-white"
                    : "hover:bg-slate-100"
                }`}
              >
                {opt}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
