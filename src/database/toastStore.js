import { create } from 'zustand'

const useSnackbarStore = create((set) => ({
  show: false,
  message: null,
  setShow: (show, message) => set((state) => ({ show: show, message: message })),
}))

export default useSnackbarStore