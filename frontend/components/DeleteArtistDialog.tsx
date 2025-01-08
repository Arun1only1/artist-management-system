import { deleteArtist } from "@/lib/api-routes/artist/artist.routes";
import { openErrorSnackbar } from "@/store/slices/snackbarSlice";
import { getMessageFromError } from "@/utils/get.message.from.error";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { useDispatch } from "react-redux";
import Loader from "./Loader/Loader";
import { hasPermission } from "@/permissions/component.permission";
import { Resource } from "@/permissions/resource.enum";
import { Action } from "@/permissions/action.enum";

interface Props {
  artistId: string;
}
const DeleteArtistDialog = ({ artistId }: Props) => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   react queryClient
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["delete-artist"],
    mutationFn: async () => {
      return await deleteArtist(artistId);
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["get-artist-list"] });
    },
    onError: (error) => {
      dispatch(openErrorSnackbar({ message: getMessageFromError(error) }));
    },
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      {hasPermission(Resource.ARTIST, Action.DELETE) && (
        <Tooltip title="Delete">
          <IconButton onClick={handleClickOpen} color="error">
            <DeleteOutlinedIcon />
          </IconButton>
        </Tooltip>
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this artist?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting an artist is a permanent action and cannot be undone.
            Please proceed with caution, as this process is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions className="gap-8">
          <Button
            onClick={() => {
              handleClose();
              mutate();
            }}
            color="error"
            variant="outlined"
          >
            yes
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            color="success"
            variant="contained"
          >
            no
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteArtistDialog;
