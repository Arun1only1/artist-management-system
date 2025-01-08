"use client";
import ArtistTable from "@/components/ArtistTable";
import CsvUpload from "@/components/CsvUpload";
import DownloadCsv from "@/components/DownloadCsv";
import Loader from "@/components/Loader/Loader";
import ROUTES from "@/constant/route.constants";
import { Action } from "@/permissions/action.enum";
import { hasPermission } from "@/permissions/component.permission";
import { Resource } from "@/permissions/resource.enum";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ArtistList = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-start items-center gap-12 ">
      {hasPermission(Resource.ARTIST, Action.CREATE) && (
        <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={() => {
            router.push(ROUTES.ADD_ARTIST);
          }}
        >
          Add Artist
        </Button>
      )}

      <div className=" w-full lg:w-[90%] flex flex-col justify-center items-center gap-4">
        <div className="flex gap-8">
          {hasPermission(Resource.ARTIST, Action.EXPORT_CSV) && <DownloadCsv />}

          {hasPermission(Resource.ARTIST, Action.IMPORT_CSV) && <CsvUpload />}
        </div>

        <ArtistTable />
      </div>
    </div>
  );
};

export default ArtistList;
