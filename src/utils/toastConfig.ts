// On ajoute "type" devant ToastOptions pour corriger l'erreur Vite
import { toast, Bounce, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
};

export const ToastSucces = (message: string) => {
  toast.success(message, defaultOptions);
};

export const ToastError = (message: string) => {
  toast.error(message, {
    ...defaultOptions,
    autoClose: 6000,
  });
};

export const ToastInfo = (message: string) => {
  toast.info(message, defaultOptions);
};