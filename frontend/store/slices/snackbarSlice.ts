import { AlertColor } from '@mui/material';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import ResponseMessage from '@/constant/response.message';

interface SnackbarPayloadProps {
  message: string;
}

interface InitialStateProps {
  severity: AlertColor;
  open: boolean;
  message: string;
  vertical: 'top' | 'bottom';
  horizontal: 'left' | 'center' | 'right';
}

const initialState: InitialStateProps = {
  severity: 'success',
  open: false,
  message: '',
  vertical: 'top',
  horizontal: 'center',
};

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSuccessSnackbar: (
      state,
      action: PayloadAction<SnackbarPayloadProps>
    ) => {
      state.open = true;
      state.message = action.payload.message;
      state.severity = 'success';
      state.vertical = 'bottom';
      state.horizontal = 'left';
    },

    openErrorSnackbar: (state, action: PayloadAction<SnackbarPayloadProps>) => {
      state.open = true;
      state.message =
        action?.payload?.message || ResponseMessage.SOMETHING_WENT_WRONG;
      state.severity = 'error';
      state.vertical = 'bottom';
      state.horizontal = 'left';
    },

    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { openErrorSnackbar, openSuccessSnackbar, closeSnackbar } =
  snackbarSlice.actions;

export default snackbarSlice.reducer;
