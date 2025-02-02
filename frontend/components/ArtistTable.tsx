"use client";

import ROUTES from "@/constant/route.constants";
import { getArtistList } from "@/lib/api-routes/artist/artist.routes";
import { Action } from "@/permissions/action.enum";
import { hasPermission } from "@/permissions/component.permission";
import { Resource } from "@/permissions/resource.enum";
import { formatDate } from "@/utils/format.date";
import { getGenderLabel } from "@/utils/get.gender.label";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { IconButton, Pagination, Tooltip, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import DeleteArtistDialog from "./DeleteArtistDialog";
import ErrorItem from "./ErrorItem";
import Loader from "./Loader/Loader";
import NoItemFound from "./NoItemFound";
export interface ArtistProps {
  id: string;
  firstName: string;
  lastName: string;
  firstReleaseYear: number;
  numberOfAlbums: number;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
}

const ArtistTable = () => {
  // router
  const router = useRouter();
  // page
  const [page, setPage] = useState(1);
  const { isPending, data, isError } = useQuery({
    queryKey: ["get-artist-list", page],
    queryFn: () => {
      return getArtistList({ page, limit: 10 });
    },
    enabled: hasPermission(Resource.ARTIST, Action.READ),
  });

  const artistList: ArtistProps[] = data?.data?.artistList?.result;
  const totalPages: number = data?.data?.songList?.totalPages;

  if (isPending) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorItem />;
  }

  if (artistList.length < 1) {
    return <NoItemFound />;
  }
  return (
    <div className="w-screen  lg:w-4/5 flex flex-col justify-center items-center ">
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 3 }}
        className="overflow-x-auto w-full"
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ marginBottom: 2, ml: "1rem" }}
        >
          Artist List
        </Typography>
        <Table className="w-full min-w-[600px]">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                S.N.
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Name
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Email
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Gender
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Address
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Phone
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                DOB
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                First Release Year
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Number of Albums
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {artistList?.map((item, index) => (
              <TableRow
                key={item.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  "&:hover": { backgroundColor: "#f1f1f1" },
                }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center" className="capitalize">
                  {`${item.firstName} ${item.lastName}`}
                </TableCell>
                <TableCell align="center">{item?.email}</TableCell>
                <TableCell align="center" className="capitalize">
                  {getGenderLabel(item?.gender)}
                </TableCell>
                <TableCell align="center" className="capitalize">
                  {item?.address}
                </TableCell>
                <TableCell align="center" className="capitalize">
                  {item?.phone}
                </TableCell>
                <TableCell align="center" className="capitalize">
                  {formatDate(item?.dob)}
                </TableCell>
                <TableCell align="center" className="capitalize">
                  {item?.firstReleaseYear}
                </TableCell>
                <TableCell align="center" className="capitalize">
                  {item?.numberOfAlbums}
                </TableCell>
                <TableCell align="center">
                  <div className="flex justify-center items-center">
                    {hasPermission(Resource.ARTIST, Action.READ) && (
                      <Tooltip title="Songs">
                        <IconButton
                          color="primary"
                          onClick={() => {
                            router.push(
                              `${ROUTES.ARTIST_SONG_LIST}/${item.id}`
                            );
                          }}
                        >
                          <RemoveRedEyeOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    {hasPermission(Resource.ARTIST, Action.UPDATE) && (
                      <Tooltip title="Edit">
                        <IconButton
                          color="success"
                          onClick={() => {
                            router.push(`${ROUTES.EDIT_ARTIST}/${item.id}`);
                          }}
                        >
                          <EditNoteOutlinedIcon />
                        </IconButton>
                      </Tooltip>
                    )}

                    <DeleteArtistDialog artistId={item.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        page={page}
        count={totalPages}
        color="secondary"
        className="my-12"
        onChange={(_, pageNumber) => {
          setPage(pageNumber);
        }}
      />
    </div>
  );
};

export default ArtistTable;
