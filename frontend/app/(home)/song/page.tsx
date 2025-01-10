"use client";
import AddSongDialog from "@/components/AddSongDialog";
import Loader from "@/components/Loader/Loader";
import SongTable from "@/components/SongTable";
import { useEffect, useState } from "react";

const SongList = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col justify-start items-center gap-8 ">
      <AddSongDialog />
      <SongTable />
    </div>
  );
};

export default SongList;
