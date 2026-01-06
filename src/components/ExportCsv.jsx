import { Download } from "lucide-react";
import React from "react";

const ExportCsv = ({ rates, currencies, base }) => {
  const exportToCSV = () => {
    if (!rates || currencies.length === 0) return;
    let csv = "," + currencies.join(",") + "\n";

    currencies.forEach((rowBase) => {
      let row = rowBase;
      currencies.forEach((quote) => {
        const value = rowBase === quote ? 1 : rates[quote] / rates[rowBase];
        row += "," + value.toFixed(6);
      });
      csv += row + "\n";
    });
    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download -
      `FX_Cross_Rates_${base}_${new Date().toISOString().slice(0, 10)}.csv`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <button
        className="export rounded-lg gradientexport cursor-pointer flex items-center gap-2 text-white px-4 py-2 text-sm font-semibold  "
        onClick={exportToCSV}
        disabled={!currencies.length}
      >
        <Download className="w-5 h-5" />
        Export CSV
      </button>
    </>
  );
};

export default ExportCsv;
