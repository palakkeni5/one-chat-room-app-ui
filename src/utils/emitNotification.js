import { toast } from "react-toastify";

export const NOTIFICATION_TYPE = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
};

export const emitNotification = (type, message) => {
  const config = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  return type === NOTIFICATION_TYPE.INFO
    ? toast.info(message, config)
    : type === NOTIFICATION_TYPE.SUCCESS
    ? toast.success(message, config)
    : type === NOTIFICATION_TYPE.ERROR
    ? toast.error(message, config)
    : toast(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
};
