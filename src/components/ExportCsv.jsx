import { Download } from "lucide-react";
import * as XLSX from "xlsx-js-style";

const formatUtcForFilename = (dateInput) => {
  const d = new Date(dateInput);

  const date = d.toISOString().slice(0, 10); // YYYY-MM-DD

  const time = d
    .toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
    .replace(/:/g, "-") // HH-MM-SS AM
    .replace(/\s+/g, "_"); // space → _

  return `${date}_${time}_UTC`;
};

const ExportCsv = ({ rates, currencies, base, lastUpdated }) => {
  const exportToExcel = () => {
    if (!rates || currencies.length === 0) return;

    const heading = [["Cross Currency Rates"]];
    const meta = [
      [
        `Total Currencies: ${
          currencies.length
        } | Base: ${base} | Last Updated: ${
          lastUpdated
            ? new Date(lastUpdated).toLocaleString("en-US", {
                timeZone: "UTC",
                timeZoneName: "short",
              })
            : "—"
        }`,
      ],
    ];

    const headerRow = ["", ...currencies];

    const dataRows = currencies.map((rowBase) => {
      return [
        rowBase,
        ...currencies.map((quote) =>
          rowBase === quote ? 1 : +(rates[quote] / rates[rowBase]).toFixed(6)
        ),
      ];
    });

    const worksheetData = [...heading, ...meta, [], headerRow, ...dataRows];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    worksheet["A1"].s = {
      font: {
        bold: true,
        italic: true,
        sz: 18,
      },
    };

    // 🔹 Merge heading across all columns
    worksheet["!merges"] = [
      {
        s: { r: 0, c: 0 }, // A1
        e: { r: 0, c: currencies.length }, // last column
      },
    ];

    // 🔹 Style metadata row (A2)
    worksheet["A2"].s = {
      font: {
        sz: 13,
      },
    };
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Cross Currency Rates");

    const formattedDate = lastUpdated
      ? formatUtcForFilename(lastUpdated)
      : formatUtcForFilename(new Date());

    const fileName = `Cross_Currency_Rates_${formattedDate}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return (
    <button
      className="export rounded-lg gradientexport cursor-pointer flex items-center gap-2 text-white px-4 py-2 text-sm font-semibold"
      onClick={exportToExcel}
      disabled={!currencies.length}
    >
      <Download className="w-5 h-5" />
      Export CSV
    </button>
  );
};

export default ExportCsv;
