import React, { useEffect, useState } from "react";
import ConverterCard from "../components/ConverterCard";
import ConversionTable from "../components/ConversionTable";
import { useLoading } from "../context/LoadingContext";

const CurrencyConverter = () => {
  const [rates, setRates] = useState({});
  const { setLoading } = useLoading();

  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/fx/live?base=USD`
        );
        const data = await res.json();
        setRates(data.rates);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="min-h-[calc(100vh-110px)] max-w-[90%] mx-auto   dark:text-[#fafafa] py-6">
      <div className=" lg:w-[70%] m-auto">
         <ConverterCard
          rates={rates}
          from={from}
          to={to}
          setFrom={setFrom}
          setTo={setTo}
        />

      </div>
      <div className=" lg:w-[70%] m-auto mt-4">
        <div className=" grid lg:grid-cols-2 gap-6">
        <ConversionTable from={from} to={to} rates={rates} />

        <ConversionTable from={to} to={from} rates={rates} />
      </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
