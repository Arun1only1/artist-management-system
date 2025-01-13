"use client";
import $axios from "@/lib/axios/axios.instance";
import { Button, styled, Typography } from "@mui/material";
import { useState } from "react";

import { openErrorSnackbar } from "@/store/slices/snackbarSlice";
import { getMessageFromError } from "@/utils/get.message.from.error";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import Loader from "./Loader/Loader";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
type QueryKey = ["get-artist-list"];

const CsvUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationKey: ["upload-csv"],
    mutationFn: async (formData: FormData) => {
      return await $axios.post("/csv/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      const queryKey: QueryKey = ["get-artist-list"];

      // @ts-expect-error: Suppress this type check error
      queryClient.invalidateQueries(queryKey);
    },
    onError: (error) => {
      dispatch(openErrorSnackbar({ message: getMessageFromError(error) }));
    },
  });

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const fileExtension = file?.name?.split(".")?.pop()?.toLowerCase();

    if (fileExtension !== "csv") {
      dispatch(openErrorSnackbar({ message: "Please upload csv file." }));
      return;
    }

    console.log({ file });

    const formData = new FormData();
    formData.append("file", file);

    await mutate(formData);
  };

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="flex justify-center items-center gap-4">
      <Button
        color="secondary"
        component="label"
        role={undefined}
        variant="outlined"
        size="small"
        tabIndex={-1}
        startIcon={<CloudUploadIcon />}
      >
        select csv
        <VisuallyHiddenInput type="file" onChange={handleFileChange} />
      </Button>

      {file && <Typography>{file.name}</Typography>}
      {file && (
        <Button onClick={handleUpload} variant="contained" size="small">
          upload
        </Button>
      )}
    </div>
  );
};

export default CsvUpload;
