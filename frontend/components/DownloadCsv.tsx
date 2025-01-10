import $axios from "@/lib/axios/axios.instance";
import { Button } from "@mui/material";
import React from "react";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const DownloadCsv = () => {
  // download csv
  const downloadCsv = async () => {
    try {
      const response = await $axios.get("/csv/download", {
        responseType: "text",
      });

      if (response.status === 200) {
        const csvData = response.data;

        // Convert the CSV string data to a Blob
        const blob = new Blob([csvData], { type: "text/csv" });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "artist-data.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(url);
      } else {
        console.error("Failed to download CSV");
      }
    } catch (error) {
      console.error("Error during CSV download:", error);
    }
  };
  return (
    <Button
      onClick={downloadCsv}
      startIcon={<FileDownloadIcon />}
      variant="outlined"
      color="secondary"
      size="small"
    >
      download csv
    </Button>
  );
};

export default DownloadCsv;
