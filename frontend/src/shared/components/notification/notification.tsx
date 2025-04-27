import { notifications } from "@mantine/notifications";

interface NotificationOptions {
  type: "Success" | "Error";
  msg: string;
}

export const notify = (type: NotificationOptions["type"], msg: NotificationOptions["msg"]) => {
  if (type === "Success") {
    notifications.show({
      message: msg,
      title: "Success",
      color: "green",
    });
  } else {
    notifications.show({
      message: msg,
      title: "Error",
      color: "red",
    });
  }
};
