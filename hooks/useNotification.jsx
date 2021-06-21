import { store as notificationStore } from "react-notifications-component";
/**
 * useNotification - display notifications
 */
export default function useNotification() {
  const errorNotification = (message) => {
    notificationStore.addNotification({
      title: "Помилка!",
      message,
      type: "danger",
      insert: "bottom",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 5000,
        onScreen: true,
      },
    });

    throw new Error(message || "Щось пішло не так!");
  };

  return { spawnErrorNotification: errorNotification };
}
