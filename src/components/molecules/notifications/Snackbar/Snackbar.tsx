import MuiSnackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectNotify, closeNotify } from '@/redux/features/notify';

const Snackbar = () => {
  const { isOpen, message, severity } = useAppSelector(selectNotify);
  const dispatch = useAppDispatch();

  const handleClose = () => dispatch(closeNotify());

  return (
    <MuiSnackbar
      open={isOpen}
      onClose={handleClose}
      autoHideDuration={6000}
      key={message}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        variant="filled"
        onClose={handleClose}
        severity={severity}
        sx={{ width: 1, wordBreak: 'break-word' }}
      >
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
