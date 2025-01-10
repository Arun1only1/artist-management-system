import { CircularProgress } from "@mui/material";
import React from "react";

const Loader: React.FC = () => {
  // components/Loader.js

  return (
    <div className="fixed inset-0 bg-transparent flex justify-center items-center z-50">
      <CircularProgress color="primary" size={50} />
    </div>
  );
};

export default Loader;
