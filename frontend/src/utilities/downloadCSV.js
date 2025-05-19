// utils/downloadCSV.js

export const downloadCSV = (data, headers, keys, filename = "invoices.csv") => {
    const csvHeader = headers.join(",") + "\n";
  
    const csvRows = data.map(row =>
      keys.map(key => `"${row[key] ?? ''}"`).join(",")
    ).join("\n");
  
    const csvContent = csvHeader + csvRows;
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  