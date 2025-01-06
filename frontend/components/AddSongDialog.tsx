import AddSongForm from '@/app/(home)/song/add/page';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';

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
      <Button variant='contained' color='success' onClick={handleClickOpen}>
        Add Song
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <AddSongForm handleClose={handleClose} />
      </Dialog>
    </React.Fragment>
  );
};
export default AddSongDialog;
