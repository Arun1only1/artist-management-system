import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import * as React from "react";
import AddSongForm from "./AddSongForm";

const AddSongDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        color="secondary"
        size="small"
        onClick={handleClickOpen}
      >
        Add Song
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <AddSongForm handleClose={handleClose} />
      </Dialog>
    </React.Fragment>
  );
};
export default AddSongDialog;
