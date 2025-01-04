import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteUser } from '@/lib/api-routes/user.routes';
import { Tooltip } from '@mui/material';
import Loader from './Loader';
import { useDispatch } from 'react-redux';
import { getMessageFromError } from '@/utils/get.message.from.error';
import { openErrorSnackbar } from '@/store/slices/snackbarSlice';

interface Props {
  userId: string;
}
const DeleteUserDialog = ({ userId }: Props) => {
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
    mutationKey: ['delete-user'],
    mutationFn: () => deleteUser(userId),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ['get-user-list'] });
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
        <DialogTitle>Are you sure you want to delete this user?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting a user is a permanent action and cannot be undone. Please
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

export default DeleteUserDialog;
