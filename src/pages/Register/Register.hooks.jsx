/* eslint-disable import/prefer-default-export */
import { useMutation } from 'react-query';
import userRepository from '../../database/user';
import useSnackbarStore from '../../database/toastStore';

export const useRegister = () => {
  const setShow = useSnackbarStore(state => state.setShow)
  return useMutation({
    mutationFn: (data) => userRepository.register(data.email, data.password),
    onSuccess: () => {
      setShow(true, 'Register success')
    }
  })
};
