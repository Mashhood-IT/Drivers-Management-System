import { toast } from "react-toastify";

export const downloadSecurePDF = async (fileUrl, fileName = "file") => {
  try {
    toast.info("Preparing download...");

    // Check if it's a Cloudinary PDF and add fl_attachment for direct download
    let downloadUrl = fileUrl;
    if (
      fileUrl.includes("cloudinary.com") &&
      fileUrl.endsWith(".pdf") &&
      !fileUrl.includes("fl_attachment")
    ) {
      downloadUrl = fileUrl.replace("/upload/", "/upload/fl_attachment/");
    }

    const response = await fetch(downloadUrl);
    if (!response.ok) throw new Error("Download failed");

    const contentType = response.headers.get("content-type");
    const blob = await response.blob();
    const blobUrl = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobUrl;

    // Auto-append file extension if not already provided
    if (!fileName.includes(".")) {
      if (contentType.includes("pdf")) {
        fileName += ".pdf";
      } else if (contentType.includes("image")) {
        const extension = contentType.split("/")[1];
        fileName += `.${extension}`;
      }
    }

    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    toast.success("Download started!");
  } catch (error) {
    console.error("Download error:", error);
    toast.error("Failed to download file.");
  }
};
