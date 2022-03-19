import { useCallback } from 'react';
import { AlertProps } from '@mui/material/Alert';
import { useAppDispatch } from '@/hooks';
import { openNotify } from '@/redux/features/notify';

const useNotify = () => {
  const dispatch = useAppDispatch();

  const notify = useCallback(
    (message: string, severity: AlertProps['severity'] = 'success') => {
      dispatch(
        openNotify({
          message,
          severity,
        }),
      );
    },
    [dispatch],
  );

  return notify;
};

export default useNotify;
