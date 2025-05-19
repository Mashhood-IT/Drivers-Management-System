import { toast } from "react-toastify";

export const downloadSecurePDF = async (pdfUrl, fileName = "document.pdf") => {
  try {
    const downloadUrl = pdfUrl.includes("cloudinary.com") && !pdfUrl.includes("fl_attachment")
      ? pdfUrl.replace("/upload/", "/upload/fl_attachment/")
      : pdfUrl;

    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error("Download failed");

    const blob = await response.blob();
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(link.href);

    toast.success("Download started!");
  } catch (error) {
    toast.error("Failed to download PDF");
  }
};

