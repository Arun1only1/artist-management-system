'use client';

import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import Alert from '@mui/material/Alert';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

import { RootState } from '@/store/store';
import { closeSnackbar } from '@/store/slices/snackbarSlice';

const CustomSnackbar = () => {
  const { open, message, severity, vertical, horizontal } = useSelector(
    (state: RootState) => state.snackbar
  );

  const dispatch = useDispatch();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch(closeSnackbar());
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant='filled'
          sx={{ width: '100%' }}
        >
          {message || 'hello'}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CustomSnackbar;
