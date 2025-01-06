import { deleteSong } from '@/lib/api-routes/song/song.routes';
import { openErrorSnackbar } from '@/store/slices/snackbarSlice';
import { getMessageFromError } from '@/utils/get.message.from.error';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Tooltip } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import Loader from './Loader/Loader';

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
    mutationKey: ['delete-song'],
    mutationFn: () => deleteSong(songId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['get-song-list'] });
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
      <Tooltip title='Delete'>
        <Button
          disableRipple
          color='error'
          onClick={handleClickOpen}
          startIcon={<DeleteOutlinedIcon />}
        ></Button>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this song?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting a song is a permanent action and cannot be undone. Please
            proceed with caution, as this process is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions className='gap-8'>
          <Button
            onClick={() => {
              handleClose();
              mutate();
            }}
            color='error'
            variant='outlined'
          >
            yes
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            color='success'
            variant='contained'
          >
            no
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DeleteArtistDialog;
