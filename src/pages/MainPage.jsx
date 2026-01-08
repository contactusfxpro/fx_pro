import { useEffect, useRef, useState } from "react";
import CurrencyTable from "../components/CurrencyTable";
import { currencyGroups } from "../utils/currencyGroups";
import SearchableDropdown from "../components/SearchableDropdown";
import { Download } from "lucide-react";
import { useLoading } from "../context/LoadingContext";
import ExportCsv from "../components/ExportCsv";
import Footer from "../components/Footer";

const Home = () => {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState({});
  const [lastUpdated, setLastUpdated] = useState("");
  const [activeTab, setActiveTab] = useState("ALL");
  const [fetchOk, setFetchOk] = useState(true);
  const { setLoading } = useLoading();

  const BASE_OPTIONS = [
    "USD",
    "EUR",
    "GBP",
    "CHF",
    "SEK",
    "NOK",
    "DKK",
    "PLN",
    "CZK",
    "HUF",
    "RON",
    "ISK",
    "CAD",
    "MXN",
    "BRL",
    "ARS",
    "CLP",
    "COP",
    "PEN",
    "UYU",
    "JPY",
    "CNY",
    "CNH",
    "INR",
    "KRW",
    "SGD",
    "HKD",
    "THB",
    "IDR",
    "MYR",
    "PHP",
    "VND",
    "AUD",
    "NZD",
    "AED",
    "SAR",
    "QAR",
    "KWD",
    "BHD",
    "OMR",
    "EGP",
    "ZAR",
    "NGN",
    "KES",
    "GHS",
    "TZS",
    "UGX",
    "MAD",
    "DZD",
    "TND",
    "RUB",
  ];

  const prevRatesRef = useRef({});
  const ratesCacheRef = useRef({});
  const abortRef = useRef(null);
  const firstLoadRef = useRef(true);

  useEffect(() => {
    console.log("BASE STATE:", base);
  }, [base]);

  const loadRates = async () => {
    if (!base) return;

    try {
      if (firstLoadRef.current) {
        setLoading(true);
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/fx/live?base=${base}`
      );

      if (!res.ok) {
        throw new Error("API error");
      }

      const data = await res.json();

      if (data?.rates) {
        ratesCacheRef.current[base] = data.rates;
        setRates(data.rates);
        setLastUpdated(data.fetchedAt || "");
        setFetchOk(true);
        firstLoadRef.current = false;
      }
    } catch (err) {
      console.error("FX fetch error:", err.message);
      setFetchOk(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!base) return;

    let intervalId;

    const start = async () => {
      await loadRates();
      intervalId = setInterval(loadRates, 5000);
    };

    start();

    return () => {
      clearInterval(intervalId);
      if (abortRef.current) {
        abortRef.current.abort();
      }
    };
  }, [base]);

  const allCurrencies = Object.keys(rates);

  const currencies =
    activeTab === "ALL"
      ? allCurrencies
      : allCurrencies.filter((c) => currencyGroups[activeTab]?.includes(c));

  return (
    <>
      <div className="mx-auto  p-6 lg:space-y-4   dark:bg-[#070d17] dark:text-[#f4f4f4]">
        <div className="flex flex-wrap  gap-2 md:gap-6 text-sm text-slate-600 dark:text-[#f4f4f4]">
          <div className="flex items-center gap-1">
            <span className="font-semibold">Currencies:</span>{" "}
            <p className="text-blue-600 font-bold">{currencies.length}</p>
          </div>

          <div>
            <span className="font-semibold">Last Update:</span>{" "}
            {lastUpdated
              ? new Date(lastUpdated).toLocaleString("en-US", {
                  timeZone: "UTC",
                  timeZoneName: "short",
                })
              : "—"}
          </div>
        </div>

        <div className="header lg:flex justify-between items-center">
          <div className="tabs flex flex-wrap gap-2  mt-4 md:mb-2 lg:mt-0 lg:mb-0 ">
            {[
              ["ALL", "Overview"],
              ["EUROPE_AMERICAS", "Europe & Americas"],
              [
                "ASIA_PACIFIC_MIDDLE_EAST_AFRICA",
                "Asia-Pacific, Middle East & Africa",
              ],
              ["G7_BRICS", "G7 & BRICS"],
            ].map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition cursor-pointer border
        ${
          activeTab === key
            ? "bg-blue-600 text-white border-none"
            : "bg-slate-100 text-slate-700 border-gray-50 dark:bg-[#070d17] dark:text-[#f4f4f4] dark:border-gray-700 "
        }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="md:flex items-center gap-6 md:mt-2 lg:mt-0">
            <div className="base flex items-center gap-2 ">
              <p className="text-slate-600 font-semibold dark:text-[#f4f4f4]">
                {" "}
                Base Currency :{" "}
              </p>
              <SearchableDropdown
                options={BASE_OPTIONS}
                value={base}
                onChange={setBase}
              />
            </div>
            <ExportCsv
              rates={rates}
              currencies={currencies}
              base={base}
              lastUpdated={lastUpdated}
            />
          </div>
        </div>

        <CurrencyTable
          rates={rates}
          currencies={currencies}
          prevRates={prevRatesRef.current}
        />
      </div>
    </>
  );
};

export default Home;
