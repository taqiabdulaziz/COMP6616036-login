/* eslint-disable import/prefer-default-export */
import { useMutation } from 'react-query';
import userRepository from '../../database/user';
import useSnackbarStore from '../../database/toastStore';

export const useForgetPassword = () => {
  const setShow = useSnackbarStore(state => state.setShow)
  return useMutation({
    mutationFn: (data) => userRepository.changePassword(data.email, data.password, data.newPassword),
    onSuccess: () => {
      setShow(true, 'Success Change Password')
    }
  })
};
